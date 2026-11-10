"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

export type Detail = { icon: ReactNode; text: string; href?: string };

/* A whole-day band that has more to say than its title, such as the after-party.
   It works like a TalkCard: the band is a button that shows where, and the
   details open in the same <dialog> the talks use. */
export default function EventCard({
  title,
  when,
  where,
  details,
  style,
}: {
  title: string;
  when: string;
  where: Detail;
  /** shown only inside the dialog */
  details: Detail[];
  style: CSSProperties;
}) {
  const dlg = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        className="ag-item ag-band ag-event"
        style={style}
        onClick={() => dlg.current?.showModal()}
      >
        <span className="ag-title">{title}</span>
        <span className="ag-details">
          <span>
            {where.icon}
            {where.text}
          </span>
        </span>
        <span className="ag-when">{when}</span>
      </button>

      <dialog
        ref={dlg}
        className="talk-dialog"
        onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}
      >
        <div className="td-panel">
          <form method="dialog">
            <button type="submit" className="td-close" aria-label="Close">
              ×
            </button>
          </form>
          <h3 className="td-title">{title}</h3>
          <p className="td-meta">
            {when} · {where.text}
          </p>
          <ul className="td-details">
            {[where, ...details].map((d) => (
              <li key={d.text}>
                {d.icon}
                {d.href ? (
                  <a href={d.href} target="_blank" rel="noopener noreferrer">
                    {d.text}
                  </a>
                ) : (
                  d.text
                )}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
