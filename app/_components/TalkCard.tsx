"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, type CSSProperties } from "react";
import type sessions from "../_data/sessions.json";

export type Session = (typeof sessions)[number];

/* A session in its timetable slot. The card is a button sized by the grid, so it
   only previews — faces, title, who — and the abstract and bios open in a
   <dialog>, which brings its own focus trap, Escape and backdrop. */
export default function TalkCard({
  session: s,
  when,
  track,
  flash,
  style,
}: {
  session: Session;
  when: string;
  track: string;
  /** a lightning talk: the slot is a third the height, so the card is one row */
  flash?: boolean;
  style: CSSProperties;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const who = s.speakers.map((p) => p.name).join(" & ");
  const faces = (px: number) =>
    s.speakers.map((p) => (
      <img key={p.photo} src={`/images/speakers/${p.photo}`} width={px} height={px} alt="" />
    ));

  return (
    <>
      <button
        type="button"
        className={`ag-item ag-talk ag-session${flash ? " ag-flash" : ""}`}
        data-track={track}
        data-chip={s.chip}
        style={style}
        onClick={() => dlg.current?.showModal()}
      >
        <span className="ag-face">{faces(28)}</span>
        <span className="ag-who">{who}</span>
        <span className="ag-title">{s.title}</span>
        <span className="ag-when">{when}</span>
      </button>

      {/* the dialog's own box is the backdrop's edge: a click that lands on it,
          not on the panel inside, is a click outside */}
      <dialog
        ref={dlg}
        className="talk-dialog"
        onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}
      >
        <div className="td-panel">
          {/* first in the DOM, so it takes focus when the dialog opens */}
          <form method="dialog">
            <button type="submit" className="td-close" aria-label="Close">
              ×
            </button>
          </form>
          <div className="td-head">
            <span className="td-face">{faces(64)}</span>
            <div>
              <h3 className="td-title">{s.title}</h3>
              <p className="td-who">{who}</p>
              <p className="td-meta">
                {when} · {track} · {s.format} · {s.level} · {s.chip}
              </p>
            </div>
          </div>
          <p className="td-desc">{s.description}</p>
          {s.speakers.map((p) => (
            <div key={p.photo} className="td-speaker">
              <p className="td-name">{p.name}</p>
              <p className="td-tag">{p.tagline}</p>
              <p className="td-bio">{p.bio}</p>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}
