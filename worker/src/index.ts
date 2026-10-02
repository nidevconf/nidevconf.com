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
  // CORS only hides the response; a text/plain POST from any other site would
  // still be written. Browsers always send Origin on a POST, so this stops them.
  const origin = req.headers.get("origin");
  if (!origin || !env.ORIGINS.split(",").includes(origin)) {
    return new Response("Not from the agenda", { status: 403 });
  }
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

  // Only real sessions count, so a device holds at most the agenda. If the
  // site can't be reached, take the list on trust rather than lose hearts.
  const timetable = await sessionIds(env);
  const want = new Set(ids as string[]);
  if (timetable.size && [...want].some((id) => !timetable.has(id))) {
    return new Response("Unknown session id", { status: 400 });
  }

  /* The list sent is the whole list, so a lost request heals on the next. But
     D1 bills every row (and index entry) written, so only the difference is
     written, and a list that hasn't changed writes nothing at all. */
  const { results } = await env.DB.prepare("SELECT session FROM picks WHERE device = ?")
    .bind(device)
    .all<{ session: string }>();
  const have = new Set(results.map((r) => r.session));
  const added = [...want].filter((id) => !have.has(id));
  const removed = [...have].filter((id) => !want.has(id));
  if (!added.length && !removed.length) return new Response(null, { status: 204 });

  // The read above is outside the batch, so two tabs syncing the same device at
  // once can both decide to add a row. OR IGNORE keeps the second from failing
  // the whole batch on the primary key; the deletes are already idempotent.
  await env.DB.batch([
    ...removed.map((id) =>
      env.DB.prepare("DELETE FROM picks WHERE device = ? AND session = ?").bind(device, id),
    ),
    ...added.map((id) =>
      env.DB.prepare("INSERT OR IGNORE INTO picks (device, session) VALUES (?, ?)").bind(device, id),
    ),
    env.DB.prepare(
      `INSERT INTO devices (device, first, last) VALUES (?1, ?2, ?2)
       ON CONFLICT (device) DO UPDATE SET last = ?2`,
    ).bind(device, Date.now()),
  ]);
  return new Response(null, { status: 204 });
}

// The live agenda, cached at the edge for five minutes. Empty if unreachable.
async function timetable(env: Env): Promise<Slot[]> {
  try {
    const r = await fetch(`${env.SITE}/timetable.json`, { cf: { cacheTtl: 300 } });
    return r.ok ? ((await r.json()) as Slot[]) : [];
  } catch {
    return [];
  }
}

async function sessionIds(env: Env) {
  return new Set((await timetable(env)).flatMap((s) => (s.id ? [s.id] : [])));
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
  const [slots, bySession, totals, daily] = await Promise.all([
    timetable(env),
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
  ]);
  return {
    timetable: slots,
    counts: bySession,
    people: totals?.people ?? 0,
    picks: totals?.picks ?? 0,
    last: totals?.last ?? null,
    daily: daily.results,
    clashes: await clashes(env, slots),
  };
}

/* How many people picked both of two sessions that run at the same time. Only
   the pairs that actually overlap are counted, each by index lookups, rather
   than joining every pick to every other. They are written into the SQL rather
   than bound because D1 allows only 100 bound parameters; they are checked to
   be plain digits first. */
async function clashes(env: Env, slots: Slot[]) {
  const talks = slots.filter((s) => s.id && SESSION.test(s.id));
  const pairs: string[] = [];
  for (const x of talks) {
    for (const y of talks) {
      if (x.id! < y.id! && x.start < y.end && y.start < x.end) pairs.push(`('${x.id}','${y.id}')`);
    }
  }
  if (!pairs.length) return [];
  const { results } = await env.DB.prepare(
    `WITH pair (a, b) AS (VALUES ${pairs.join(",")})
     SELECT pair.a AS a, pair.b AS b, COUNT(*) AS n
     FROM pair
     JOIN picks x ON x.session = pair.a
     JOIN picks y ON y.device = x.device AND y.session = pair.b
     GROUP BY pair.a, pair.b
     ORDER BY n DESC
     LIMIT 15`,
  ).all<{ a: string; b: string; n: number }>();
  return results;
}
