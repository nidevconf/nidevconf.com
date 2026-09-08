/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import PlayerDialog from "./PlayerDialog";

export type WallItem = {
  /** /media/<slug>.mp4, -teaser.mp4 and -poster.jpg */
  slug: string;
  name: string;
  /** shown in the player, not on the card */
  role: string;
  /** one line of theirs, shown when the card opens up; a trailer has none */
  quote?: string;
  /** e.g. "1:19" */
  duration: string;
  /** a YouTube video id: the full video plays from there instead of /media/<slug>.mp4 */
  youtube?: string;
  /** where to rest the crop while the card is narrow, as object-position; centre by default */
  focus?: string;
};

/* A row of portraits, one of them open: square, its silent loop playing, a line of
   theirs along the foot. The first is open by default; hovering (or focusing) another
   hands it the open state, and leaving the row hands it back. A press opens the full
   video in the shared player. The width and the reveal are CSS on .is-open; only
   play/pause needs a hand from here. */
export default function VideoWall({ items }: { items: WallItem[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<WallItem | null>(null);
  const loops = useRef<Record<string, HTMLVideoElement | null>>({});
  const open = hovered ?? items[0]?.slug;

  // the open card's loop runs, the rest hold their still; reduced-motion keeps all still
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const [slug, v] of Object.entries(loops.current)) {
      if (!v) continue;
      if (slug === open) {
        v.muted = true;
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  }, [open]);

  return (
    <>
      <ul className="wall" onMouseLeave={() => setHovered(null)}>
        {items.map((it) => (
          <li
            key={it.slug}
            className={`wall-card${it.slug === open ? " is-open" : ""}`}
            onMouseEnter={() => setHovered(it.slug)}
          >
            <button
              type="button"
              className="wall-hit"
              onClick={() => setActive(it)}
              onFocus={() => setHovered(it.slug)}
              onBlur={() => setHovered(null)}
              aria-label={`Watch ${it.name}, ${it.duration}`}
            >
              <img
                src={`/media/${it.slug}-poster.jpg`}
                alt=""
                style={{ objectPosition: it.focus }}
              />
              <video
                style={{ objectPosition: it.focus }}
                ref={(el) => {
                  loops.current[it.slug] = el;
                }}
                src={`/media/${it.slug}-teaser.mp4`}
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden
              />
              {/* the same pill as before; a span, since the card is already the button */}
              <span className="teaser-play">
                <Play size={16} fill="currentColor" aria-hidden />
                Watch video
                <span className="teaser-time">{it.duration}</span>
              </span>
              <span className="wall-caption">{it.name}</span>
              {it.quote && <q className="wall-quote">{it.quote}</q>}
            </button>
          </li>
        ))}
      </ul>
      <PlayerDialog
        open={active !== null}
        onClose={() => setActive(null)}
        src={active && !active.youtube ? `/media/${active.slug}.mp4` : undefined}
        youtube={active?.youtube}
        title={active?.name ?? ""}
        subtitle={active?.role ?? ""}
      />
    </>
  );
}
