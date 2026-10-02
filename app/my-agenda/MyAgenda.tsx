"use client";

/* eslint-disable @next/next/no-img-element */
import { CalendarPlus, Link2 } from "lucide-react";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import FavButton from "../_components/FavButton";
import { setAll, useFavourites } from "../_components/favourites";
import type { Slot } from "../_components/Schedule";

/* Your day: the sessions you hearted in time order, with the breaks between them
   so it reads as a day, and a flag on any two that run at the same time.

   A share link carries the picks in the URL — /my-agenda#s=1271354,1308347 —
   which is how they get from a laptop to a phone without an account. Opening
   one previews it and asks before it touches the picks already here. */

const clock = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

// The hash is outside React. Reading it through the same external-store shape
// as the picks keeps the prerendered page (no hash) and the browser in step.
const hashListeners = new Set<() => void>();
function subscribeHash(onChange: () => void) {
  hashListeners.add(onChange);
  addEventListener("hashchange", onChange);
  return () => {
    hashListeners.delete(onChange);
    removeEventListener("hashchange", onChange);
  };
}
function clearHash() {
  history.replaceState(null, "", location.pathname + location.search);
  hashListeners.forEach((l) => l()); // replaceState fires no hashchange
}

export default function MyAgenda({ timetable }: { timetable: Slot[] }) {
  const picks = useFavourites();
  const hash = useSyncExternalStore(subscribeHash, () => location.hash, () => "");
  const [copied, setCopied] = useState(false);

  const known = new Set(timetable.flatMap((s) => (s.id ? [s.id] : [])));
  const shared = hash.startsWith("#s=")
    ? [...new Set(hash.slice(3).split(","))].filter((id) => known.has(id))
    : null;
  const sameAsMine =
    shared !== null && shared.length === picks.length && shared.every((id) => picks.includes(id));
  const previewing = shared !== null && shared.length > 0 && !sameAsMine;
  const ids = new Set(previewing ? shared : picks);

  const sessions = timetable.filter((s) => s.id && ids.has(s.id));
  const day = timetable.filter((s) => !s.id || ids.has(s.id));
  const clashes = new Map(
    sessions.map((s) => [
      s.id!,
      sessions.filter((o) => o !== s && o.start < s.end && s.start < o.end),
    ]),
  );

  function copyLink() {
    const url = `${location.origin}/my-agenda#s=${sessions.map((s) => s.id).join(",")}`;
    navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => prompt("Copy this link to your agenda:", url),
    );
  }

  return (
    <div className="my-agenda">
      {previewing && (
        <div className="my-shared" role="status">
          <p>
            This is a shared agenda with {shared.length} session{shared.length > 1 ? "s" : ""}.
            {picks.length > 0 && ` You have ${picks.length} of your own on this device.`}
          </p>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setAll(shared);
                clearHash();
              }}
            >
              {picks.length ? "Replace mine with this" : "Use this agenda"}
            </button>
            {picks.length > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setAll([...picks, ...shared]);
                  clearHash();
                }}
              >
                Add these to mine
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={clearHash}>
              {picks.length ? "Keep mine" : "Dismiss"}
            </button>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="my-empty">
          <p>Nothing on your agenda yet.</p>
          <p>
            Tap the <span aria-hidden>♡</span> on any session in the agenda to add it here.
          </p>
          <div className="btn-row">
            <Link className="btn btn-primary" href="/#agenda">
              Browse the agenda <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          {!previewing && (
            <div className="btn-row my-actions">
              <button type="button" className="btn btn-secondary" onClick={copyLink}>
                <Link2 size={16} aria-hidden /> {copied ? "Link copied" : "Copy link to my agenda"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => download(sessions)}
              >
                <CalendarPlus size={16} aria-hidden /> Add to calendar
              </button>
            </div>
          )}

          <ol className="my-day">
            {day.map((s) =>
              s.id ? (
                <li
                  key={s.id}
                  className="my-row my-session"
                  data-clash={clashes.get(s.id)!.length > 0 || undefined}
                >
                  <span className="my-time">
                    {clock(s.start)}
                    <span>{clock(s.end)}</span>
                  </span>
                  <span className="my-faces" aria-hidden>
                    {s.photos!.map((p) => (
                      <img key={p} src={`/images/speakers/${p}`} width={40} height={40} alt="" />
                    ))}
                  </span>
                  <span className="my-text">
                    <Link className="my-title" href={`/sessions/${s.slug}`}>
                      {s.title}
                    </Link>
                    <span className="my-meta">
                      {s.who} · {s.track} · {s.format}
                    </span>
                    {clashes.get(s.id)!.map((o) => (
                      <span key={o.id} className="my-clash">
                        Clashes with “{o.title}” in {o.track}
                      </span>
                    ))}
                  </span>
                  {!previewing && <FavButton id={s.id} title={s.title} />}
                </li>
              ) : (
                <li key={`${s.start}-${s.title}`} className="my-row my-band">
                  <span className="my-time">{clock(s.start)}</span>
                  <span className="my-text">
                    {s.title}
                    {s.track && <span className="my-meta"> · {s.track}</span>}
                  </span>
                </li>
              ),
            )}
          </ol>
        </>
      )}
    </div>
  );
}

/* An .ics of the picks, made here in the browser. The day is 21 November, when
   Belfast is on GMT, so local time and UTC are the same and every time can be
   written as UTC (the Z) with no VTIMEZONE block. */
function download(sessions: Slot[]) {
  const t = (m: number) => `20261121T${clock(m).replace(":", "")}00Z`;
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const stamp = new Date().toISOString().replace(/[-:]|\.\d+/g, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NIDC//My agenda//EN",
    "CALSCALE:GREGORIAN",
    ...sessions.flatMap((s) => [
      "BEGIN:VEVENT",
      `UID:${s.id}@nidevconf.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${t(s.start)}`,
      `DTEND:${t(s.end)}`,
      `SUMMARY:${esc(s.title)}`,
      `DESCRIPTION:${esc(`${s.who}\nhttps://nidevconf.com/sessions/${s.slug}`)}`,
      `LOCATION:${esc(`${s.track}, ICC Belfast`)}`,
      `URL:https://nidevconf.com/sessions/${s.slug}`,
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
  ];
  // lines longer than 75 octets fold onto a continuation line that opens with a
  // space; 60 characters leaves room for a title's curly quotes and accents
  const fold = (l: string) => l.match(/.{1,60}/gu)!.join("\r\n ");
  const blob = new Blob([lines.map(fold).join("\r\n") + "\r\n"], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "nidc-2026-my-agenda.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}
