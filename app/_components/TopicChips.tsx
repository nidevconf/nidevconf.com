"use client";

import { useState, type CSSProperties } from "react";

/* The subject areas on offer, in the order they read best. */
const CHIPS = ["Engineering", "Product", "Design", "Security", "AI", "Data", "Wildcard"];

/* Toggles, for filtering the schedule later. Nothing reads `selected` yet — when
   something does, this state is what lifts. */
export default function TopicChips() {
  const [selected, setSelected] = useState<string[]>([]);
  // The tilt is CSS on :hover, but the settle back is a decaying wobble, and a
  // transition can only overshoot once — the two bounces need keyframes, and
  // keyframes cannot be triggered by losing :hover. So leaving a chip flags it
  // and the animation clears the flag when it ends, as TiltBadge does for its pop.
  const [wobbling, setWobbling] = useState<string[]>([]);
  const settled = (topic: string) => setWobbling((w) => w.filter((t) => t !== topic));

  return (
    <ul className="chips">
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
