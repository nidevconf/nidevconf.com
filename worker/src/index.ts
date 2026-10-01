import adminPage from "./admin.html";

/* The agenda API. Visitors' browsers send their hearted sessions here under a
   random id they made themselves; organisers read the totals on /admin.

     POST /picks/:device   body: ["1271354", ...]  the device's whole list
     GET  /admin           the organisers' page    Access (or ADMIN_KEY) only
     GET  /admin/stats     everything that page shows

   The counts are only ever read behind the admin door: how many people want
   each talk is for the organisers, not for the internet.                      */

interface Env {
  DB: D1Database;
  RATE: RateLimit;
  SITE: string;
  ORIGINS: string;
  // secrets, set with `wrangler secret put`
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  ADMIN_KEY?: string;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const SESSION = /^\d{1,10}$/;
const MAX_PICKS = 60; // the whole agenda is fewer sessions than this

export default {
  async fetch(req, env): Promise<Response> {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const picks = url.pathname.match(/^\/picks\/([^/]+)$/);
    if (picks && req.method === "POST") {
      const res = await savePicks(req, env, picks[1]);
      for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
      return res;
    }

    if (url.pathname === "/admin" || url.pathname === "/admin/") {
      // the page itself holds no data, but Access keeps it behind the same door
      if (env.ACCESS_AUD && !(await accessOk(req, env))) return deny();
      return new Response(adminPage, {
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
      });
    }

    if (url.pathname === "/admin/stats" && req.method === "GET") {
      if (!(await adminOk(req, env))) return deny();
      return Response.json(await stats(env), { headers: { "cache-control": "no-store" } });
    }

    return new Response("Not found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;

/* ---- the public side ---- */

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get("origin");
  if (!origin || !env.ORIGINS.split(",").includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

async function savePicks(req: Request, env: Env, device: string) {
  if (!UUID.test(device)) return new Response("Bad device id", { status: 400 });

  const ip = req.headers.get("cf-connecting-ip") ?? "local";
  const { success } = await env.RATE.limit({ key: ip });
  if (!success) return new Response("Slow down", { status: 429 });

  let ids: unknown;
  try {
    ids = JSON.parse(await req.text());
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }
  if (
    !Array.isArray(ids) ||
    ids.length > MAX_PICKS ||
    !ids.every((id) => typeof id === "string" && SESSION.test(id))
  ) {
    return new Response("Expected an array of session ids", { status: 400 });
  }

  // the whole list replaces what was there, so a lost request heals on the next
  const now = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM picks WHERE device = ?").bind(device),
    ...[...new Set(ids as string[])].map((id) =>
      env.DB.prepare("INSERT INTO picks (device, session) VALUES (?, ?)").bind(device, id),
    ),
    env.DB.prepare(
      `INSERT INTO devices (device, first, last) VALUES (?1, ?2, ?2)
       ON CONFLICT (device) DO UPDATE SET last = ?2`,
    ).bind(device, now),
  ]);
  return new Response(null, { status: 204 });
}

async function countBySession(env: Env) {
  const { results } = await env.DB.prepare(
    "SELECT session, COUNT(*) AS n FROM picks GROUP BY session",
  ).all<{ session: string; n: number }>();
  return Object.fromEntries(results.map((r) => [r.session, r.n]));
}

/* ---- the organisers' side ---- */

function deny() {
  return new Response("Organisers only", { status: 403, headers: { "cache-control": "no-store" } });
}

/* Access is the door when it is set up; the shared key is the fallback for
   before it is, and for `wrangler dev`, where there is no Access in front. */
async function adminOk(req: Request, env: Env) {
  if (env.ACCESS_AUD) return accessOk(req, env);
  const key = req.headers.get("authorization")?.replace(/^Bearer /, "");
  return Boolean(env.ADMIN_KEY && key && (await same(key, env.ADMIN_KEY)));
}

// constant time, so the key cannot be guessed a character at a time
async function same(a: string, b: string) {
  const enc = new TextEncoder();
  const [x, y] = await Promise.all(
    [a, b].map((s) => crypto.subtle.digest("SHA-256", enc.encode(s))),
  );
  return crypto.subtle.timingSafeEqual(x, y);
}

/* Access puts a signed JWT on every request it lets through. Checking it here
   means a request that found its way round Access (the workers.dev address,
   say) still gets nothing. https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/ */
async function accessOk(req: Request, env: Env) {
  const jwt = req.headers.get("cf-access-jwt-assertion");
  if (!jwt || !env.ACCESS_AUD || !env.ACCESS_TEAM_DOMAIN) return false;
  try {
    const [h, p, sig] = jwt.split(".");
    const header = JSON.parse(text(h)) as { kid: string; alg: string };
    const claims = JSON.parse(text(p)) as { aud: string | string[]; exp: number; iss: string };
    const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    if (
      header.alg !== "RS256" ||
      !aud.includes(env.ACCESS_AUD) ||
      claims.iss !== `https://${env.ACCESS_TEAM_DOMAIN}` ||
      claims.exp * 1000 < Date.now()
    ) {
      return false;
    }
    const certs = await fetch(`https://${env.ACCESS_TEAM_DOMAIN}/cdn-cgi/access/certs`, {
      cf: { cacheTtl: 3600 },
    });
    const { keys } = (await certs.json()) as { keys: (JsonWebKey & { kid: string })[] };
    const jwk = keys.find((k) => k.kid === header.kid);
    if (!jwk) return false;
    const key = await crypto.subtle.importKey(
      "jwk",
      jwk,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    return crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      bytes(sig),
      new TextEncoder().encode(`${h}.${p}`),
    );
  } catch {
    return false;
  }
}

function bytes(b64url: string) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64.padEnd(b64.length + ((4 - (b64.length % 4)) % 4), "=")), (c) =>
    c.charCodeAt(0),
  );
}
const text = (b64url: string) => new TextDecoder().decode(bytes(b64url));

type Slot = {
  start: number;
  end: number;
  title: string;
  track?: string;
  id?: string;
  slug?: string;
  format?: string;
  who?: string;
};

/* Everything the admin page draws, in one response. The timetable comes from
   the live site, so the page always matches the agenda people are picking from. */
async function stats(env: Env) {
  const [timetable, bySession, totals, daily, pairs] = await Promise.all([
    fetch(`${env.SITE}/timetable.json`, { cf: { cacheTtl: 300 } })
      .then((r) => (r.ok ? (r.json() as Promise<Slot[]>) : []))
      .catch(() => [] as Slot[]),
    countBySession(env),
    env.DB.prepare(
      `SELECT (SELECT COUNT(DISTINCT device) FROM picks) AS people,
              (SELECT COUNT(*) FROM picks) AS picks,
              (SELECT MAX(last) FROM devices) AS last`,
    ).first<{ people: number; picks: number; last: number | null }>(),
    env.DB.prepare(
      `SELECT date(first / 1000, 'unixepoch') AS day, COUNT(*) AS n
       FROM devices GROUP BY day ORDER BY day`,
    ).all<{ day: string; n: number }>(),
    env.DB.prepare(
      `SELECT a.session AS a, b.session AS b, COUNT(*) AS n
       FROM picks a JOIN picks b ON a.device = b.device AND a.session < b.session
       GROUP BY a.session, b.session`,
    ).all<{ a: string; b: string; n: number }>(),
  ]);

  // a pair only matters when the two run at the same time
  const at = new Map(timetable.filter((s) => s.id).map((s) => [s.id!, s]));
  const clashes = pairs.results
    .filter(({ a, b }) => {
      const x = at.get(a);
      const y = at.get(b);
      return x && y && x.start < y.end && y.start < x.end;
    })
    .sort((x, y) => y.n - x.n)
    .slice(0, 15);

  return {
    timetable,
    counts: bySession,
    people: totals?.people ?? 0,
    picks: totals?.picks ?? 0,
    last: totals?.last ?? null,
    daily: daily.results,
    clashes,
  };
}
