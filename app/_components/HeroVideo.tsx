"use client";

import { useEffect, useRef } from "react";

// Background footage for the hero. No controls: it is decoration, so it stays
// muted and silent and nothing about it is interactive.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // React can drop the attribute on hydration, and autoplay needs it
    // A looping background video is exactly what this preference is about —
    // leave the poster frame up instead. No autoPlay attribute, so this decides.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {}); // autoplay blocked — the poster still stands in
  }, []);

  return (
    <div className="hero-video" aria-hidden>
      <video ref={ref} loop muted playsInline poster="/media/trailer-poster.jpg">
        <source src="/media/trailer.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
