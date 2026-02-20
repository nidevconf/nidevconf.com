"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";

/* ── Infocom green-on-black palette ──────────────────────── */
const CLR = {
  black: "#000000",
  green: "#33FF33",
  dimGreen: "#1A9E1A",
  brightGreen: "#66FF66",
  amber: "#FFB000",
  white: "#FFFFFF",
};

/* ── Countdown ───────────────────────────────────────────── */
const EVENT_DATE = new Date("2025-11-08T08:30:00Z");
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function useCountdown() {
  const [t, setT] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  useEffect(() => {
    function calc() {
      const diff = EVENT_DATE.getTime() - Date.now();
      if (diff <= 0) return setT({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setT({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ── ASCII art ───────────────────────────────────────────── */
const SCENE = `
                          THE HITCHHIKER'S GUIDE
                                  TO THE
                    NORTHERN IRELAND DEVELOPERS CONFERENCE

           _____________________________________________________
          |  _________________________________________________  |
          | |                                                 | |
          | |  > DON'T PANIC                                  | |
          | |                                                 | |
          | |  NIDC 2025                                      | |
          | |  ICC BELFAST                                    | |
          | |  NOVEMBER 8TH                                   | |
          | |                                                 | |
          | |  "In the beginning the conference was created.  | |
          | |   This has made a lot of people very happy      | |
          | |   and has been widely regarded as a good move." | |
          | |                                                 | |
          | |_________________________________________________| |
          |  ___ ___ ___   ___   _________________________  __ |
          | |42 | | |   | |   | |                         ||  ||
          |_|___|_|_|___|_|___|_|_________________________||__||`;

/* ── Game text sequence ──────────────────────────────────── */
const STORY: { text: string; color: string; delay: number }[] = [
  { text: "", color: CLR.green, delay: 0 },
  {
    text: "NIDC 2025: The Hitchhiker's Guide to the Conference",
    color: CLR.amber,
    delay: 600,
  },
  {
    text: "Interactive Fiction by Infocom (not really)",
    color: CLR.dimGreen,
    delay: 1200,
  },
  {
    text: "Release 42 / Serial No. 251108",
    color: CLR.dimGreen,
    delay: 1800,
  },
  { text: "", color: CLR.green, delay: 2200 },
  {
    text: "Grand Foyer, ICC Belfast",
    color: CLR.amber,
    delay: 2600,
  },
  {
    text: "You are standing in the grand foyer of the ICC Belfast, which",
    color: CLR.green,
    delay: 3200,
  },
  {
    text: "is about as far from the destruction of your home planet as",
    color: CLR.green,
    delay: 3800,
  },
  {
    text: "you could reasonably hope to get on a Saturday morning.",
    color: CLR.green,
    delay: 4400,
  },
  { text: "", color: CLR.green, delay: 4800 },
  {
    text: "Around you, 750+ developers mill about with the quiet",
    color: CLR.green,
    delay: 5000,
  },
  {
    text: "desperation of people who haven't yet found the coffee.",
    color: CLR.green,
    delay: 5600,
  },
  {
    text: "Six tracks of talks stretch out before you like the",
    color: CLR.green,
    delay: 6200,
  },
  {
    text: "improbability drive of knowledge — covering Software, AI,",
    color: CLR.green,
    delay: 6800,
  },
  {
    text: "Cloud, Security, and everything in between.",
    color: CLR.green,
    delay: 7400,
  },
  { text: "", color: CLR.green, delay: 7800 },
  {
    text: "Your towel is draped reassuringly over one shoulder.",
    color: CLR.brightGreen,
    delay: 8000,
  },
  { text: "", color: CLR.green, delay: 8600 },
  {
    text: "To the north is the Exhibition Hall. The after-party at",
    color: CLR.green,
    delay: 8800,
  },
  {
    text: "Marcus Ward beckons from the south with pizza and an open",
    color: CLR.green,
    delay: 9400,
  },
  {
    text: "bar, which frankly seems like the most sensible place in",
    color: CLR.green,
    delay: 10000,
  },
  {
    text: "the galaxy right now.",
    color: CLR.green,
    delay: 10600,
  },
  { text: "", color: CLR.green, delay: 11000 },
  {
    text: "There is a registration desk here.",
    color: CLR.green,
    delay: 11200,
  },
  { text: "", color: CLR.green, delay: 11600 },
  {
    text: ">",
    color: CLR.white,
    delay: 11800,
  },
];

/* ── Interactive commands ────────────────────────────────── */
const COMMANDS: Record<
  string,
  { response: string[]; color: string; link?: string }
> = {
  TICKETS: {
    response: [
      "> get ticket",
      "",
      "You approach the registration desk. A volunteer, who is",
      "clearly one of those terrifyingly organised people, hands",
      "you a lanyard with practiced efficiency.",
      "",
      '"Welcome to NIDC 2025!" she says with genuine enthusiasm.',
      "You are momentarily stunned. Nobody has been this nice to",
      "you since that time the Dentrassi smuggled you aboard the",
      "Vogon ship.",
      "",
      "Your ticket glows faintly. Your adventure begins.",
    ],
    color: CLR.green,
    link: "/tickets",
  },
  AGENDA: {
    response: [
      "> consult guide about schedule",
      "",
      "You flip open the Guide. In large, friendly letters on",
      "the cover it says DON'T PANIC. Underneath, in smaller,",
      "slightly less friendly letters, it says:",
      "",
      "  09:30  Opening & First Sessions",
      "  10:30  Morning Sessions (bring towel)",
      "  12:00  Lunch & Expo Hall",
      "         (food almost, but not quite, entirely",
      "          unlike what the Dentrassi serve)",
      "  13:00  Afternoon Sessions",
      "  15:30  Final Sessions",
      "  17:30  Closing & Prize Draw",
      "  18:00  After-party @ Marcus Ward",
      "         (Pan Galactic Gargle Blasters not",
      "          available, but the bar is open)",
      "",
      "The Guide rates this schedule as 'Mostly Harmless'.",
    ],
    color: CLR.green,
    link: "/agenda",
  },
  SPEAKERS: {
    response: [
      "> look up speakers in guide",
      "",
      "The Guide has this to say about the speakers at NIDC:",
      "",
      '"40+ speakers. Local industry professionals. No sales',
      "pitches. No corporate doublespeak. Just hard-won wisdom",
      "shared freely among peers, which is frankly the sort of",
      "thing that restores your faith in carbon-based life forms.",
      "",
      "Many regard this as the most improbable gathering of",
      'useful knowledge since the Great Collapsing Hrung Disaster."',
      "",
      "The entry is followed by the words SEE ALSO: people who",
      "actually know what they're talking about (rare).",
    ],
    color: CLR.green,
    link: "/speakers",
  },
  LOOK: {
    response: [
      "> look",
      "",
      "Grand Foyer, ICC Belfast",
      "",
      "A large, well-lit space that manages to be both imposing",
      "and welcoming, much like a Magrathean showroom but with",
      "better signage.",
      "",
      "  Level 0: Registration, Cloakroom",
      "  Level 1: Exhibition Hall, Talks",
      "  Level 2: Quiet Room, Childcare",
      "  Level 3: More Talks, Kids' Village",
      "",
      "Volunteers in pink t-shirts patrol helpfully. They appear",
      "to know the answer to Life, the Universe, and Everything,",
      "or at least where the toilets are, which is arguably more",
      "useful.",
    ],
    color: CLR.green,
  },
  HELP: {
    response: [
      "The Guide suggests the following interactions:",
      "",
      "  TICKETS   - Acquire your passage",
      "  AGENDA    - Consult the day's programme",
      "  SPEAKERS  - Look up the speakers",
      "  LOOK      - Examine your surroundings",
      "  INVENTORY - Check your belongings",
      "  NORTH     - Enter the Exhibition Hall",
      "  TOWEL     - Check towel status",
      "  42        - The answer",
      "  EXIT      - Return to normal space-time",
    ],
    color: CLR.amber,
  },
  INVENTORY: {
    response: [
      "> inventory",
      "",
      "You are carrying:",
      "",
      "  A towel (slightly damp)",
      "  A copy of The Hitchhiker's Guide (NIDC Edition)",
      "  A Sub-Etha Sens-O-Matic (no signal)",
      "  An empty coffee cup",
      "  A lingering sense of improbability",
      "",
      "Your ticket status: NOT YET ACQUIRED",
      "(The Guide suggests this is a problem you should",
      "address sooner rather than later.)",
    ],
    color: CLR.green,
  },
  NORTH: {
    response: [
      "> go north",
      "",
      "Exhibition Hall",
      "",
      "You enter a vast hall lined with sponsor stalls. Gearset,",
      "Enso, Payroc, DailyPay, Magnite, and many more display",
      "their wares with the enthusiasm of Sirius Cybernetics",
      "Corporation salespeople, except these ones actually have",
      "useful products.",
      "",
      "The smell of fresh coffee and traybakes fills the air.",
      "For a brief, wonderful moment, you forget that your",
      "planet was demolished to make way for a hyperspace bypass.",
    ],
    color: CLR.green,
    link: "/sponsors",
  },
  TOWEL: {
    response: [
      "> check towel",
      "",
      "Your towel is here, draped over your shoulder. It is",
      "slightly damp but otherwise in good condition.",
      "",
      "The Guide has this to say about towels:",
      "",
      '"A towel is about the most massively useful thing',
      'an interstellar hitchhiker can have." It goes on to',
      "note that any developer who can keep track of their",
      "towel AND their conference lanyard is clearly a person",
      "to be reckoned with.",
    ],
    color: CLR.brightGreen,
  },
  "42": {
    response: [
      "> ask Deep Thought",
      "",
      '"Forty-two," said Deep Thought, with infinite majesty',
      "and calm.",
      "",
      "In the case of NIDC 2025, the question was almost",
      "certainly: 'How many speakers does it take to fill a",
      "Saturday with actual useful knowledge?'",
      "",
      "The answer, as it turns out, is 40+.",
      "Close enough.",
    ],
    color: CLR.amber,
  },
  "DON'T PANIC": {
    response: [
      "You take a deep breath.",
      "",
      "The large, friendly letters on the cover of the Guide",
      "glow reassuringly. You are at a developer conference",
      "in Belfast. There is coffee. There are talks. There is",
      "a quiet room if it all gets too much.",
      "",
      "Everything is going to be fine.",
      "",
      "Probably.",
    ],
    color: CLR.brightGreen,
  },
  DRINK: {
    response: [
      "> order drink",
      "",
      "The best drink in existence is the Pan Galactic Gargle",
      "Blaster. Its effect is like having your brain smashed",
      "out by a slice of lemon wrapped round a large gold brick.",
      "",
      "The after-party at Marcus Ward doesn't serve those, but",
      "they do have an open bar and pizza, which the Guide rates",
      "as 'nearly as good and significantly less fatal'.",
    ],
    color: CLR.green,
  },
  EXIT: {
    response: [
      "> leave",
      "",
      "So long, and thanks for all the talks.",
    ],
    color: CLR.amber,
    link: "/",
  },
};

/* ── Component ───────────────────────────────────────────── */
export default function TerminalContent() {
  const countdown = useCountdown();
  const [visibleStory, setVisibleStory] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<
    { text: string; color: string; link?: string }[]
  >([]);
  const [cursorOn, setCursorOn] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Story reveal
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    STORY.forEach((_, i) => {
      setTimeout(() => setVisibleStory(i + 1), STORY[i].delay);
    });
    setTimeout(() => setShowPrompt(true), STORY[STORY.length - 1].delay + 600);
  }, []);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);
  useEffect(scrollToBottom, [visibleStory, history, showPrompt, scrollToBottom]);

  // Focus input when prompt shows
  useEffect(() => {
    if (showPrompt) inputRef.current?.focus();
  }, [showPrompt]);

  // Handle redirect after command
  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        window.location.href = redirect;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  function handleCommand() {
    const cmd = input.trim().toUpperCase();
    setInput("");

    const echo = { text: `> ${cmd.toLowerCase()}`, color: CLR.white };
    const entry = COMMANDS[cmd];

    if (entry) {
      const lines = entry.response.map((t) => ({
        text: t,
        color: entry.color,
      }));
      setHistory((h) => [...h, echo, ...lines, { text: "", color: CLR.green }]);
      if (entry.link) setRedirect(entry.link);
    } else if (cmd) {
      const responses = [
        `You can't see any "${cmd.toLowerCase()}" here. The Guide has no entry for it either, which is saying something.`,
        `That's not something you can do here. Try typing HELP, or just don't panic.`,
        `"${cmd.toLowerCase()}" is not recognised. The Babel Fish in your ear shrugs unhelpfully.`,
        `Nothing happens. This is not unlike the rest of the universe, most of the time.`,
      ];
      const pick = responses[Math.floor(Math.random() * responses.length)];
      setHistory((h) => [
        ...h,
        echo,
        { text: pick, color: CLR.dimGreen },
        { text: "", color: CLR.green },
      ]);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 sm:p-6"
      style={{ backgroundColor: CLR.black }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* CRT scanlines */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />
      {/* CRT vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Phosphor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.03]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(51,255,51,0.15) 0%, transparent 70%)",
        }}
      />

      <div
        className="w-full max-w-3xl border rounded-sm shadow-2xl relative"
        style={{
          borderColor: CLR.dimGreen,
          backgroundColor: CLR.black,
          boxShadow: `0 0 40px ${CLR.dimGreen}20, inset 0 0 80px ${CLR.black}`,
        }}
      >
        {/* Title bar */}
        <div
          className="px-3 py-1.5 text-center text-xs tracking-[0.2em]"
          style={{
            backgroundColor: CLR.dimGreen,
            color: CLR.black,
          }}
        >
          THE HITCHHIKER&apos;S GUIDE TO NIDC 2025 &mdash; A Text Adventure
          <Link
            href="/"
            className="absolute right-3 top-1.5 hover:opacity-70 transition-opacity"
            style={{ color: CLR.black }}
          >
            [X]
          </Link>
        </div>

        <div
          ref={scrollRef}
          className="overflow-y-auto p-3 sm:p-5"
          style={{
            fontFamily: '"VT323", "Courier New", "Lucida Console", monospace',
            fontSize: "15px",
            lineHeight: "1.5",
            minHeight: "70vh",
            maxHeight: "82vh",
            color: CLR.green,
          }}
        >
          {/* Scene art */}
          <pre
            className="text-[8px] sm:text-[11px] leading-[1.2] whitespace-pre overflow-x-auto mb-4"
            style={{ color: CLR.dimGreen }}
            aria-label="ASCII art of the Hitchhiker's Guide to NIDC"
          >
            {SCENE}
          </pre>

          {/* Countdown bar */}
          {countdown && (
            <div
              className="flex items-center justify-center gap-1 py-2 mb-3 text-xs tracking-wider"
              role="timer"
              aria-label={`${countdown.days} days until NIDC 2025`}
            >
              <span style={{ color: CLR.dimGreen }}>[ </span>
              <span style={{ color: CLR.amber }}>
                {pad(countdown.days)}D {pad(countdown.hours)}H{" "}
                {pad(countdown.minutes)}M {pad(countdown.seconds)}S
              </span>
              <span style={{ color: CLR.dimGreen }}>
                {" "}
                UNTIL CONFERENCE ]
              </span>
            </div>
          )}

          {/* Divider */}
          <div style={{ color: CLR.dimGreen }}>
            {"─".repeat(50)}
          </div>

          {/* Story text */}
          <div className="mt-2 space-y-0.5">
            {STORY.slice(0, visibleStory).map((line, i) => (
              <div key={i} style={{ color: line.color }}>
                {line.text || "\u00A0"}
              </div>
            ))}
          </div>

          {/* Command history */}
          {history.length > 0 && (
            <div className="mt-2 space-y-0.5">
              {history.map((line, i) => (
                <div key={`h-${i}`} style={{ color: line.color }}>
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>
          )}

          {/* Input prompt */}
          {showPrompt && !redirect && (
            <div className="mt-3 flex items-center gap-0">
              <span style={{ color: CLR.green }}>{">"} </span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCommand();
                  }}
                  className="w-full bg-transparent border-none outline-none caret-transparent"
                  style={{
                    color: CLR.green,
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                  }}
                  aria-label="Type a command"
                  autoComplete="off"
                  spellCheck={false}
                />
                {/* Fake cursor after text */}
                <span
                  className="absolute pointer-events-none"
                  style={{
                    left: `${input.length * 0.6}em`,
                    top: 0,
                    color: CLR.green,
                    opacity: cursorOn ? 1 : 0,
                  }}
                >
                  █
                </span>
              </div>
            </div>
          )}

          {/* Hint */}
          {showPrompt && !redirect && history.length === 0 && (
            <div className="mt-4" style={{ color: CLR.dimGreen }}>
              [The Guide suggests typing HELP for a list of commands.
              Or just DON&apos;T PANIC.]
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
