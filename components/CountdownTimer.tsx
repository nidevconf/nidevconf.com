"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2025-11-08T08:30:00Z");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    function calc() {
      const now = Date.now();
      const diff = EVENT_DATE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <div
      className="inline-flex items-center gap-3 sm:gap-4"
      role="timer"
      aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds until NIDC 2025`}
    >
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="glass rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-black text-white tabular-nums">
              {pad(u.value)}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-400 mt-1 block uppercase tracking-wider">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
