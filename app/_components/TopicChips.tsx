"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CHIPS } from "./chips";

/* Highlighter toggles. The chips on are written to data-on as a token list, and
   CSS lights up every session card carrying one of those names — the list and
   the schedule are siblings, so no state has to cross into the server tree. */
export default function TopicChips() {
  const [selected, setSelected] = useState<string[]>([]);
  // The tilt is CSS on :hover, but the settle back is a decaying wobble, and a
  // transition can only overshoot once — the two bounces need keyframes, and
  // keyframes cannot be triggered by losing :hover. So leaving a chip flags it
  // and the animation clears the flag when it ends, as TiltBadge does for its pop.
  const [wobbling, setWobbling] = useState<string[]>([]);
  const settled = (topic: string) => setWobbling((w) => w.filter((t) => t !== topic));

  // The list is position:sticky, and CSS cannot say whether it is currently
  // stuck. So: watch it against a root whose top edge is one pixel below the
  // sticky offset. Pinned, the list sits exactly on the offset and that pixel
  // is outside the root; in flow, it is wholly inside. The top check keeps a
  // list scrolling in from below (also partly outside) from counting. The 0
  // threshold is for a jump straight into the pinned state — a reload halfway
  // down the page — which never passes through "wholly inside".
  const list = useRef<HTMLUListElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const line = parseFloat(getComputedStyle(el).top);
    const io = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1 && e.boundingClientRect.top <= line + 0.5),
      { threshold: [0, 1], rootMargin: `-${line + 1}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={list} className={stuck ? "chips stuck" : "chips"} data-on={selected.join(" ")}>
      {CHIPS.map((topic, i) => (
        <li key={topic}>
          <button
            type="button"
            // aria-pressed drives the styling too, so the look and the announced
            // state cannot drift apart
            aria-pressed={selected.includes(topic)}
            className={wobbling.includes(topic) ? "wobble" : undefined}
            // alternating so a sweep along the row does not look mechanical
            style={{ "--tilt": `${i % 2 ? 3 : -3}deg` } as CSSProperties}
            onClick={() =>
              setSelected((s) => (s.includes(topic) ? s.filter((t) => t !== topic) : [...s, topic]))
            }
            // coming back before it settles cancels the wobble rather than fighting it
            onMouseEnter={() => settled(topic)}
            onMouseLeave={() => setWobbling((w) => (w.includes(topic) ? w : [...w, topic]))}
            onAnimationEnd={() => settled(topic)}
          >
            {topic}
          </button>
        </li>
      ))}
    </ul>
  );
}
