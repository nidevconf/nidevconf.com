"use client";

import { useEffect, useState } from "react";

// Target the event date. Start time TBC, so we count to the start of the day.
const TARGET = new Date("2026-11-21T00:00:00").getTime();
const DASH = "—"; // em dash placeholder, matches the prerendered markup

function pad(n: number) {
  return (n < 10 ? "0" : "") + n;
}

export default function Countdown() {
  const [t, setT] = useState({ d: DASH, h: DASH, m: DASH, s: DASH });

  useEffect(() => {
    function tick() {
      const diff = Math.max(0, TARGET - Date.now());
      const sec = Math.floor(diff / 1000);
      setT({
        d: String(Math.floor(sec / 86400)),
        h: pad(Math.floor((sec % 86400) / 3600)),
        m: pad(Math.floor((sec % 3600) / 60)),
        s: pad(sec % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="cd-line" aria-label="Countdown to NIDC 2026">
      <div className="seg">
        <div className="n">{t.d}</div>
        <div className="u">Days</div>
      </div>
      <div className="seg">
        <div className="n">{t.h}</div>
        <div className="u">Hrs</div>
      </div>
      <div className="seg">
        <div className="n">{t.m}</div>
        <div className="u">Min</div>
      </div>
      <div className="seg">
        <div className="n">{t.s}</div>
        <div className="u">Sec</div>
      </div>
    </div>
  );
}
