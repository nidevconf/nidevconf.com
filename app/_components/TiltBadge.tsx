"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

const MAX_DEG = 6; // tilt at full pressure, i.e. with the cursor on the pill's own edge
const PERSPECTIVE = 250; // close camera = obvious tilt on a badge this small
const PIECES = 14;
// the pointer is tracked across these; the tilt fades to nothing at the edge of their union
const ZONES = [".hero", ".site-header"];

/**
 * How hard the cursor presses on one axis, as a fraction of full tilt (-1..1).
 * Nothing at the centre, peaking with the cursor on the pill's edge, then easing back
 * off across `falloff` px — so the badge leans toward you from right across the page.
 * `offset` is distance from the pill's centre in px, `half` is half the pill's size.
 */
function pressure(offset: number, half: number, falloff: number) {
  const beyond = Math.abs(offset) - half; // px past the pill's edge, negative while over the pill
  if (beyond <= 0) return offset / half;
  return Math.sign(offset) * Math.max(0, 1 - beyond / Math.max(1, falloff));
}

type Piece = { id: number; style: CSSProperties };

const POP_SRC = "/media/badge-pop.mp3"; // ElevenLabs, trimmed to the pop and its scatter
const POP_VOLUME = 0.6;

export default function TiltBadge({ children }: { children: ReactNode }) {
  const [tilt, setTilt] = useState<CSSProperties>({});
  const [popping, setPopping] = useState(false);
  const [confetti, setConfetti] = useState<Piece[]>([]);
  const nextId = useRef(0);
  const pop = useRef<HTMLAudioElement | null>(null);
  const hit = useRef<HTMLSpanElement>(null);

  // fetched on mount, so the first click plays instantly instead of waiting on the network
  useEffect(() => {
    const el = new Audio(POP_SRC);
    el.volume = POP_VOLUME;
    pop.current = el;
  }, []);

  useEffect(() => {
    const zones = ZONES.map((s) => document.querySelector<HTMLElement>(s)).filter(
      (z): z is HTMLElement => !!z,
    );
    if (!zones.length) return;

    function move(e: globalThis.PointerEvent) {
      const el = hit.current;
      if (!el) return;
      // this wrapper never transforms, so its box is the pill's true, still position
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const box = zones.map((z) => z.getBoundingClientRect());
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // distance from the pill's edge to the far edge of the zone the cursor is heading into
      const edge = (side: "left" | "right" | "top" | "bottom") =>
        side === "left" || side === "top"
          ? Math.min(...box.map((b) => b[side]))
          : Math.max(...box.map((b) => b[side]));
      const spanX = dx < 0 ? cx - edge("left") : edge("right") - cx;
      const spanY = dy < 0 ? cy - edge("top") : edge("bottom") - cy;
      const x = pressure(dx, r.width / 2, spanX - r.width / 2);
      const y = pressure(dy, r.height / 2, spanY - r.height / 2);
      setTilt({
        // inline, because the pointer is usually nowhere near the pill now — a CSS :hover
        // rule can't tell that we are tracking, and the resting spring would lag the cursor
        transition: "transform .12s ease-out",
        transform: `perspective(${PERSPECTIVE}px) rotateX(${-y * MAX_DEG}deg) rotateY(${x * MAX_DEG}deg)`,
        // Sheen: a fixed overhead light reflecting off the tilted face. The surface turns,
        // so its reflection sweeps the opposite way to the rotation. Custom properties
        // inherit, so the button's ::before picks these up.
        "--sweep-x": `${50 - x * 50}%`,
        "--sweep-angle": `${100 + y * 34}deg`,
        // small floor, or the band is nearly invisible at the light tilts you hover at most
        "--sweep": (0.18 + 0.62 * Math.min(1, Math.hypot(x, y))).toFixed(2),
      } as CSSProperties);
    }

    function leave(e: globalThis.PointerEvent) {
      const to = e.relatedTarget as Node | null;
      if (to && zones.some((z) => z.contains(to))) return; // crossing between zones, not leaving
      setTilt({}); // drops back to the CSS spring
    }

    zones.forEach((z) => {
      z.addEventListener("pointermove", move);
      z.addEventListener("pointerleave", leave);
    });
    return () =>
      zones.forEach((z) => {
        z.removeEventListener("pointermove", move);
        z.removeEventListener("pointerleave", leave);
      });
  }, []);

  function release(e: MouseEvent<HTMLButtonElement>) {
    setPopping(true);
    if (pop.current) {
      pop.current.currentTime = 0; // restart rather than ignore a rapid second click
      pop.current.play().catch(() => {}); // a blocked autoplay must not break the animation
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // offset* are layout sizes, so they ignore whatever transform the pill is under
    const halfW = e.currentTarget.offsetWidth / 2;
    const halfH = e.currentTarget.offsetHeight / 2;
    setConfetti((live) => [
      ...live,
      ...Array.from({ length: PIECES }, (_, i) => {
        const angle = (i / PIECES) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const dist = 40 + Math.random() * 46;
        // spawn on the pill's own outline, not its centre, or the pill hides the first frames
        const sx = Math.cos(angle) * halfW;
        const sy = Math.sin(angle) * halfH;
        // apex: end of the outward burst. Stretched on x because the pill is wide.
        const ax = sx + Math.cos(angle) * dist * 1.15;
        const ay = sy + Math.sin(angle) * dist;
        return {
          id: nextId.current++,
          style: {
            "--sx": `${sx}px`,
            "--sy": `${sy}px`,
            "--ax": `${ax}px`,
            "--ay": `${ay}px`,
            "--ex": `${ax + (Math.random() - 0.5) * 50}px`, // sideways drift on the way down
            "--ey": `${ay + 120 + Math.random() * 90}px`, // gravity
            "--spin": `${(Math.random() * 2 - 1) * 400}deg`,
            "--flip": `${400 + Math.random() * 500}deg`, // edge-on flashes = paper flutter
            "--s": `${0.75 + Math.random() * 0.6}`,
            "--dur": `${0.95 + Math.random() * 0.5}s`, // they must not all land together
          } as CSSProperties,
        };
      }),
    ]);
  }

  return (
    <span className="anni-badge-hit" ref={hit}>
      {/* confetti first in the DOM so the pill always paints over it */}
      {confetti.map((p) => (
        <i
          key={p.id}
          className="anni-confetti"
          style={p.style}
          onAnimationEnd={() => setConfetti((live) => live.filter((q) => q.id !== p.id))}
        />
      ))}
      {/* tilt and press live on separate elements so the pop animation can't fight the tilt */}
      <span className="anni-badge-tilt" style={tilt}>
        <button
          type="button"
          className={popping ? "anni-badge pop" : "anni-badge"}
          // both reset first, so a fast second activation replays the pop
          onPointerDown={() => setPopping(false)}
          onKeyDown={() => setPopping(false)}
          // click, not pointerup: keyboard activation (Space/Enter) fires click only
          onClick={release}
          onAnimationEnd={() => setPopping(false)}
        >
          <span className="anni-badge-label">{children}</span>
        </button>
      </span>
    </span>
  );
}
