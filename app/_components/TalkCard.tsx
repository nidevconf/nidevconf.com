"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, type CSSProperties } from "react";
import SessionBody, { type Session } from "../sessions/SessionBody";
import FavButton from "./FavButton";
import { useFavourites } from "./favourites";

export type { Session };

/* A session in its timetable slot. The card is sized by the grid, so it
   only previews — faces, title, who — and the abstract and bios open in a
   <dialog>, which brings its own focus trap, Escape and backdrop. */
export default function TalkCard({
  session: s,
  faces,
  when,
  track,
  flash,
  style,
}: {
  session: Session;
  /** one photo file per speaker for the modal, the large crop where there is one */
  faces: string[];
  when: string;
  track: string;
  /** a lightning talk: the slot is a third the height, so the card is one row */
  flash?: boolean;
  style: CSSProperties;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const who = s.speakers.map((p) => p.name).join(" & ");
  const picked = useFavourites().includes(s.id);

  return (
    <>
      {/* The heart is a second control on the card, and a button cannot hold
          another button — so the card is a box, and the button that opens the
          modal is stretched over the whole of it with the heart above. */}
      <div
        className={`ag-item ag-talk ag-session${flash ? " ag-flash" : ""}`}
        data-track={track}
        data-chip={s.chip}
        data-picked={picked || undefined}
        style={style}
      >
        <span className="ag-face">
          {s.speakers.map((p) => (
            <img key={p.photo} src={`/images/speakers/${p.photo}`} width={28} height={28} alt="" />
          ))}
        </span>
        <span className="ag-who">{who}</span>
        <span className="ag-title">{s.title}</span>
        <span className="ag-when">{when}</span>
        <button
          type="button"
          className="ag-open"
          aria-label={`${s.title}, ${who}`}
          onClick={() => dlg.current?.showModal()}
        />
        <FavButton id={s.id} title={s.title} />
      </div>

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
          <SessionBody session={s} faces={faces} when={when} track={track} />
        </div>
      </dialog>
    </>
  );
}
