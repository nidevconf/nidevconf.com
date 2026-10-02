import { useEffect, useMemo, useSyncExternalStore } from "react";

/* The sessions a visitor has hearted, by Sessionize id. There are no accounts:
   the list lives in this browser's localStorage, and the same useSyncExternalStore
   shape as ThemeToggle keeps every heart on the page — and in other tabs — in step.

   Each change is also mirrored, whole, to the agenda Worker under a random id
   made the first time someone hearts a session. That gives the organisers a
   count per session and nothing else: no name, no email, no IP kept. Sending
   the full list every time means a lost request is fixed by the next one. */

const KEY = "agenda";
const DEVICE = "agenda-device";
const SYNCED = "agenda-synced"; // the last list the Worker accepted
const API = process.env.NEXT_PUBLIC_AGENDA_API;

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    removeEventListener("storage", onChange);
  };
}

// The snapshot is the raw string, so it compares equal between reads; parsing
// in the snapshot would hand React a new array every time and loop forever.
function read() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function useFavourites() {
  const raw = useSyncExternalStore(subscribe, read, () => "[]");
  useEffect(resyncOnce, []);
  return useMemo(() => parse(raw), [raw]);
}

/* A change is sent when it happens, but that send can be lost: offline at the
   venue, the API down, or picks made before the API existed. So the first page
   that shows a heart sends the list again, but only if it differs from the last
   one the Worker accepted; resending on every page load would burn the
   database's daily write allowance on the day. */
let resynced = false;
function resyncOnce() {
  if (resynced) return;
  resynced = true;
  if (read() !== synced()) sync();
}

function synced() {
  try {
    return localStorage.getItem(SYNCED) ?? "[]";
  } catch {
    return "[]";
  }
}

export function setAll(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set(ids)]));
  } catch {
    return; // storage blocked: nothing was saved, so there is nothing to count
  }
  listeners.forEach((l) => l()); // storage doesn't fire in the tab that wrote it
  sync();
}

export function toggle(id: string) {
  const ids = parse(read());
  setAll(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
}

/* A second of quiet before sending, so hearting five talks is one request.
   Leaving the page sends anything still waiting. */
let timer: ReturnType<typeof setTimeout> | undefined;

function sync() {
  if (!API) return;
  clearTimeout(timer);
  timer = setTimeout(push, 1000);
  addEventListener("pagehide", flush, { once: true });
}

function flush() {
  if (timer === undefined) return;
  clearTimeout(timer);
  push();
}

function device() {
  let id = localStorage.getItem(DEVICE);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE, id);
  }
  return id;
}

// POST with a text/plain body is a "simple" request, so the browser sends it
// without a CORS preflight. Fire and forget: the agenda never waits on this.
function push() {
  timer = undefined;
  const body = read();
  if (body === synced()) return; // hearted and unhearted again: nothing to tell
  try {
    fetch(`${API}/picks/${device()}`, {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body,
      keepalive: true,
    })
      .then((r) => {
        if (r.ok) localStorage.setItem(SYNCED, body);
      })
      .catch(() => {});
  } catch {
    // no storage, no crypto: the picks still work on this device
  }
}
