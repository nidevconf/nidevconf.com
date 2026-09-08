"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* The agenda drop as a calendar event: Friday 11th September 2026, 10:00 in Belfast,
   which is BST, so 09:00Z. The same event lives in public/agenda-reminder.ics for
   Apple Calendar and anything else that wants a file — change both together. */
const EVENT = {
  title: "NIDC 2026 agenda is out",
  details:
    "The NIDC 2026 agenda is out and general availability tickets are on sale. Saturday, 21st November at International Convention Centre Belfast. Check it out: https://nidevconf.com/#agenda",
  location: "https://nidevconf.com/#agenda",
  start: "2026-09-11T09:00:00+00:00",
  end: "2026-09-11T09:15:00+00:00",
};

const q = (params: Record<string, string>) => new URLSearchParams(params).toString();
/* 2026-09-11T09:00:00+00:00 → 20260911T090000Z, the form Google and Yahoo take */
const compact = (iso: string) => `${iso.replace(/[-:]|\+00:00$/g, "")}Z`;

const outlook = (host: string) =>
  `https://${host}/calendar/0/action/compose?rru=addevent&${q({
    subject: EVENT.title,
    body: EVENT.details,
    location: EVENT.location,
    startdt: EVENT.start,
    enddt: EVENT.end,
  })}`;

/* Each calendar's brandmark in its own colours, drawn on a 16 grid: close enough to
   read at 18px, simple enough to keep inline. Sized by the button or the menu item. */
const svg = (children: ReactNode) => (
  <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden>
    {children}
  </svg>
);
const MARKS = {
  /* white page framed in the four Google colours, the red fold at the corner */
  google: svg(
    <>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="#fff" />
      <path d="M1 3a2 2 0 0 1 2-2h10v3H4v10H1z" fill="#4285F4" />
      <path d="M12 4h3v8h-3z" fill="#34A853" />
      <path d="M4 12h8v3H4z" fill="#FBBC04" />
      <path d="M12 12h3l-3 3z" fill="#EA4335" />
    </>,
  ),
  /* the blue tile with the O */
  outlook: svg(
    <>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#0078D4" />
      <ellipse cx="8" cy="8" rx="3.6" ry="4.2" fill="none" stroke="#fff" strokeWidth="2" />
    </>,
  ),
  /* the four Microsoft squares */
  office: svg(
    <>
      <rect x="1" y="1" width="6.5" height="6.5" fill="#F25022" />
      <rect x="8.5" y="1" width="6.5" height="6.5" fill="#7FBA00" />
      <rect x="1" y="8.5" width="6.5" height="6.5" fill="#00A4EF" />
      <rect x="8.5" y="8.5" width="6.5" height="6.5" fill="#FFB900" />
    </>,
  ),
  /* Yahoo purple with the Y! */
  yahoo: svg(
    <>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#6001D2" />
      <text
        x="8"
        y="12"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="10"
        fill="#fff"
      >
        Y!
      </text>
    </>,
  ),
  /* the Apple Calendar app tile: white page, red header, the date */
  apple: svg(
    <>
      <rect x="1" y="1" width="14" height="14" rx="3" fill="#fff" stroke="#D0D0D0" />
      <path d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2H1z" fill="#FF3B30" />
      <text
        x="8"
        y="13"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="7"
        fill="#111"
      >
        11
      </text>
    </>,
  ),
};

const CALENDARS = [
  {
    id: "google",
    name: "Google Calendar",
    mark: MARKS.google,
    href: `https://calendar.google.com/calendar/render?action=TEMPLATE&${q({
      text: EVENT.title,
      details: EVENT.details,
      location: EVENT.location,
      dates: `${compact(EVENT.start)}/${compact(EVENT.end)}`,
    })}`,
  },
  { id: "outlook", name: "Outlook", mark: MARKS.outlook, href: outlook("outlook.live.com") },
  { id: "office", name: "Office 365", mark: MARKS.office, href: outlook("outlook.office.com") },
  {
    id: "yahoo",
    name: "Yahoo Calendar",
    mark: MARKS.yahoo,
    href: `https://calendar.yahoo.com/?v=60&${q({
      title: EVENT.title,
      desc: EVENT.details,
      in_loc: EVENT.location,
      st: compact(EVENT.start),
      et: compact(EVENT.end),
    })}`,
  },
  { id: "apple", name: "Apple Calendar (.ics)", mark: MARKS.apple, href: "/agenda-reminder.ics" },
];

/* A split button, the GitHub merge button: the main half adds the reminder to the
   chosen calendar, the caret picks which. Google is the default; the pick lives for
   the page, which is as long as anyone needs it. */
export default function AgendaReminder() {
  const [id, setId] = useState(CALENDARS[0].id);
  const pick = CALENDARS.find((c) => c.id === id) ?? CALENDARS[0];
  const isFile = pick.href.startsWith("/");

  return (
    <span className="split">
      <a
        className="btn btn-secondary split-main"
        href={pick.href}
        target={isFile ? undefined : "_blank"}
        rel={isFile ? undefined : "noopener"}
        aria-label={`Remind me when the agenda is out, in ${pick.name}`}
      >
        {pick.mark}
        Remind me when the agenda is out
      </a>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="btn btn-secondary split-caret"
          aria-label="Choose a calendar"
        >
          <ChevronDown size={18} aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto min-w-48">
          <DropdownMenuRadioGroup value={id} onValueChange={(v) => setId(String(v))}>
            {CALENDARS.map((c) => (
              <DropdownMenuRadioItem key={c.id} value={c.id}>
                {c.mark}
                {c.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
}
