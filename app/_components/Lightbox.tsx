/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export type Photo = {
  src: string;
  alt: string;
  /** object-position for the cropped thumbnail; centre by default */
  focus?: string;
};

/* Photos in the reading column that open full size on a press: an optional hero on top,
   the rest in a row beneath — or, as a trio, one tall on the left and two stacked beside
   it. One <dialog> shows whichever was pressed; it brings its own focus trap, Escape and
   backdrop, and the player's chrome is reused for it. */
export default function Lightbox({
  hero,
  photos = [],
  layout = "row",
}: {
  hero?: Photo;
  photos?: Photo[];
  layout?: "row" | "trio";
}) {
  const [active, setActive] = useState<Photo | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (active && !d.open) {
      d.showModal();
      panel.current?.focus(); // not the close button, so no focus ring on open
    }
    if (!active && d.open) d.close();
  }, [active]);

  const shot = (p: Photo) => (
    <button
      type="button"
      className="photo-hit"
      onClick={() => setActive(p)}
      aria-label={`View photo: ${p.alt}`}
    >
      <img src={p.src} alt={p.alt} style={{ objectPosition: p.focus }} />
    </button>
  );

  return (
    <>
      {hero && <div className="section-media single">{shot(hero)}</div>}
      {photos.length > 0 && (
        <div className={`section-media ${layout}`}>
          {photos.map((p) => (
            <span key={p.src}>{shot(p)}</span>
          ))}
        </div>
      )}
      <dialog
        ref={dlg}
        className="video-dialog"
        onClick={(e) => e.target === e.currentTarget && dlg.current?.close()}
        onClose={() => setActive(null)}
      >
        <div className="vd-panel" ref={panel} tabIndex={-1}>
          {active && <img src={active.src} alt={active.alt} />}
          <button
            type="button"
            className="vd-close"
            aria-label="Close"
            onClick={() => dlg.current?.close()}
          >
            <X size={20} aria-hidden />
          </button>
        </div>
      </dialog>
    </>
  );
}
