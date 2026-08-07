"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Pref = "system" | "light" | "dark";

const OPTIONS: Record<Pref, { label: string; Icon: typeof Monitor; next: Pref }> = {
  system: { label: "System", Icon: Monitor, next: "light" },
  light: { label: "Light", Icon: Sun, next: "dark" },
  dark: { label: "Dark", Icon: Moon, next: "system" },
};

// localStorage is the store. Reading it through useSyncExternalStore rather than
// in an effect keeps the prerendered markup honest — and the storage event means
// changing the theme in one tab moves the others too.
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    removeEventListener("storage", onChange);
  };
}

const read = (): Pref => (localStorage.getItem("theme") as Pref) || "system";
const readOnServer = (): Pref => "system";

// The boot script in layout.tsx stamps data-theme before first paint; this keeps
// it in step afterwards — on press, on OS change, and on a change in another tab.
function apply(pref: Pref) {
  const dark =
    pref === "dark" ||
    (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export default function ThemeToggle() {
  const pref = useSyncExternalStore(subscribe, read, readOnServer);
  const { label, Icon, next } = OPTIONS[pref];

  useEffect(() => {
    apply(pref);
  }, [pref]);

  // only "system" tracks the OS, and only while it's selected
  useEffect(() => {
    if (pref !== "system") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function cycle() {
    localStorage.setItem("theme", next);
    listeners.forEach((l) => l()); // storage doesn't fire in the tab that wrote it
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${label}. Press to switch to ${OPTIONS[next].label}.`}
    >
      <Icon size={14} aria-hidden />
      {label}
    </button>
  );
}
