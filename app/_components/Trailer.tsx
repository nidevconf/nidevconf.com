"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export default function Trailer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [pct, setPct] = useState(0);

  // Autoplay only works while muted, and React can drop `muted` on hydration. Pin it here.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {}); // autoplay blocked — poster stays, click still works
  }, []);

  // `timeupdate` only fires ~4x/sec, which makes the playhead visibly step. Follow the frames.
  useEffect(() => {
    if (!playing) return;
    let id = 0;
    const tick = () => {
      const v = ref.current;
      if (v?.duration) setPct((v.currentTime / v.duration) * 100);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [playing]);

  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function seek(next: number) {
    const v = ref.current;
    if (!v?.duration) return;
    v.currentTime = (next / 100) * v.duration;
    setPct(next);
  }

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <div className="section-video">
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        poster="/media/trailer-poster.jpg"
        tabIndex={0}
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            togglePlay();
          }
        }}
      >
        <source src="/media/trailer.mp4" type="video/mp4" />
      </video>
      <input
        type="range"
        className="video-progress"
        min={0}
        max={100}
        step={0.1}
        value={pct}
        onChange={(e) => seek(Number(e.target.value))}
        style={{ "--p": `${pct}%` } as CSSProperties}
        aria-label="Seek trailer"
      />
      <div className="video-controls">
        <button
          type="button"
          className="video-btn"
          onClick={togglePlay}
          aria-label={playing ? "Pause trailer" : "Play trailer"}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden focusable="false">
            {playing ? (
              <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
            ) : (
              <path d="M7 4l13 8-13 8z" fill="currentColor" />
            )}
          </svg>
        </button>
        <button
          type="button"
          className="video-btn"
          onClick={toggleSound}
          aria-label={muted ? "Unmute trailer" : "Mute trailer"}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden focusable="false">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            {muted ? (
              <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="2" fill="none" />
            ) : (
              <path
                d="M16.5 8.5a5 5 0 010 7M19 6a8.5 8.5 0 010 12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
