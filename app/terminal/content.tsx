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
  red: "#FF4444",
};

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
          | |  NIDC 2026                                      | |
          | |  LOCATION: ████████████                         | |
          | |  DATE: ██ ████████ 2026                         | |
          | |                                                 | |
          | |  "The ships hung in the sky in much the same    | |
          | |   way that bricks don't. The conference date    | |
          | |   hangs in the future in much the same way."    | |
          | |                                                 | |
          | |_________________________________________________| |
          |  ___ ___ ___   ___   _________________________  __ |
          | |42 | | |   | |   | |                         ||  ||
          |_|___|_|_|___|_|___|_|_________________________||__||`;

/* ── Game text sequence ──────────────────────────────────── */
const STORY: { text: string; color: string; delay: number }[] = [
  { text: "", color: CLR.green, delay: 0 },
  {
    text: "NIDC 2026: The Hitchhiker's Guide to the Conference",
    color: CLR.amber,
    delay: 600,
  },
  {
    text: "Interactive Fiction by Infocom (not really)",
    color: CLR.dimGreen,
    delay: 1200,
  },
  {
    text: "Release 43 / Serial No. ??????",
    color: CLR.dimGreen,
    delay: 1800,
  },
  { text: "", color: CLR.green, delay: 2200 },
  {
    text: "Location Unknown, Somewhere in Belfast",
    color: CLR.amber,
    delay: 2600,
  },
  {
    text: "You are standing in a void. Not the existential kind — more",
    color: CLR.green,
    delay: 3200,
  },
  {
    text: "the kind where a conference hasn't been announced yet and",
    color: CLR.green,
    delay: 3800,
  },
  {
    text: "all the details are classified at a level that would make",
    color: CLR.green,
    delay: 4400,
  },
  {
    text: "the Vogon bureaucracy proud.",
    color: CLR.green,
    delay: 5000,
  },
  { text: "", color: CLR.green, delay: 5400 },
  {
    text: "Rumours swirl through the developer community like",
    color: CLR.green,
    delay: 5600,
  },
  {
    text: "hyperspace bypasses through the fabric of space-time.",
    color: CLR.green,
    delay: 6200,
  },
  {
    text: "Something is coming. Something big. Something with",
    color: CLR.green,
    delay: 6800,
  },
  {
    text: "speakers, and tracks, and almost certainly coffee.",
    color: CLR.green,
    delay: 7400,
  },
  { text: "", color: CLR.green, delay: 7800 },
  {
    text: "Your towel is draped over one shoulder, just in case.",
    color: CLR.brightGreen,
    delay: 8000,
  },
  { text: "", color: CLR.green, delay: 8600 },
  {
    text: "All exits lead to uncertainty. The Guide flickers with",
    color: CLR.green,
    delay: 8800,
  },
  {
    text: "a single blinking cursor, waiting for more information",
    color: CLR.green,
    delay: 9400,
  },
  {
    text: "to be declassified.",
    color: CLR.green,
    delay: 10000,
  },
  { text: "", color: CLR.green, delay: 10400 },
  {
    text: "There is a large sign here that reads: WATCH THIS SPACE.",
    color: CLR.amber,
    delay: 10600,
  },
  { text: "", color: CLR.green, delay: 11000 },
  {
    text: ">",
    color: CLR.white,
    delay: 11200,
  },
];

/* ── Interactive commands ────────────────────────────────── */
const CLASSIFIED = [
  "ACCESS DENIED. That information is classified.",
  "The Guide's entry for this topic simply reads: ██████████.",
  "Nice try. The Vogon Information Bureau has redacted this.",
  "CLEARANCE LEVEL INSUFFICIENT. Please try again after the announcement.",
];

function classifiedResponse(): string[] {
  const pick = CLASSIFIED[Math.floor(Math.random() * CLASSIFIED.length)];
  return [pick];
}

const COMMANDS: Record<
  string,
  { response: string[] | (() => string[]); color: string; link?: string }
> = {
  TICKETS: {
    response: [
      "> get ticket",
      "",
      "You reach for a ticket but your hand passes through",
      "empty air. Registration for NIDC 2026 has not opened yet.",
      "",
      "The Guide notes: 'Patience is a virtue. So is checking",
      "nidevconf.com obsessively until tickets go live.'",
      "",
      "Your status: WAITING (along with everyone else).",
    ],
    color: CLR.green,
  },
  REGISTER: {
    response: () => [
      "> register",
      "",
      ...classifiedResponse(),
      "",
      "Registration will open when the time is right.",
      "The Guide recommends following NIDC on social media",
      "so you don't miss it.",
    ],
    color: CLR.red,
  },
  AGENDA: {
    response: () => [
      "> consult guide about schedule",
      "",
      "You flip open the Guide. In large, friendly letters on",
      "the cover it says DON'T PANIC. You turn to the NIDC 2026",
      "schedule page. It reads:",
      "",
      "  ██:██  ████████████████████████",
      "  ██:██  ████████████████████████",
      "  ██:██  ████████████████████████",
      "  ██:██  ████████████████████████",
      "  ██:██  ████████████████████████",
      "  ██:██  ████████████████████████",
      "",
      ...classifiedResponse(),
      "",
      "The Guide rates the upcoming schedule as '[REDACTED]'.",
    ],
    color: CLR.green,
  },
  SPEAKERS: {
    response: () => [
      "> look up speakers in guide",
      "",
      "The Guide has this to say about the speakers at NIDC 2026:",
      "",
      ...classifiedResponse(),
      "",
      "What we can tell you: they will be brilliant. They will",
      "be local. They will share hard-won wisdom freely among",
      "peers, which is frankly the sort of thing that restores",
      "your faith in carbon-based life forms.",
      "",
      "Speaker submissions? Watch this space.",
    ],
    color: CLR.green,
  },
  DATE: {
    response: () => [
      "> ask about date",
      "",
      "You consult the Guide's calendar for NIDC 2026.",
      "",
      "  Date: ██ ████████ 2026",
      "",
      ...classifiedResponse(),
      "",
      "The Guide notes: 'Time is an illusion. Conference time",
      "doubly so. But it WILL happen in 2026.'",
    ],
    color: CLR.amber,
  },
  LOCATION: {
    response: () => [
      "> examine surroundings",
      "",
      "You try to determine where NIDC 2026 will take place.",
      "",
      "  Location: ████████████, Belfast",
      "",
      ...classifiedResponse(),
      "",
      "All we can say: it's in Belfast. It always has been.",
      "It always will be. Some things are constants in an",
      "uncertain universe.",
    ],
    color: CLR.green,
  },
  VENUE: {
    response: () => [
      "> look for venue",
      "",
      ...classifiedResponse(),
      "",
      "Belfast. Beyond that, the organisers are keeping this",
      "one close to their chest, much like a Dentrassi guards",
      "its favourite cooking pot.",
    ],
    color: CLR.green,
  },
  LOOK: {
    response: [
      "> look",
      "",
      "The Void Between Conferences",
      "",
      "You are floating in the space between NIDC 2025 and",
      "NIDC 2026. It is dark, quiet, and filled with the",
      "faint hum of anticipation.",
      "",
      "  To the NORTH: fog",
      "  To the SOUTH: more fog",
      "  To the EAST: dense, impenetrable fog",
      "  To the WEST: a faint glow that might be Belfast",
      "",
      "A sign floats past reading: 'NIDC 2026 — COMING SOON.'",
      "It is followed by a smaller sign reading: 'NO SPOILERS.'",
    ],
    color: CLR.green,
  },
  HELP: {
    response: [
      "The Guide suggests the following interactions:",
      "",
      "  TICKETS   - Check registration status",
      "  DATE      - Ask about the date",
      "  LOCATION  - Investigate the venue",
      "  SPEAKERS  - Enquire about speakers",
      "  LOOK      - Examine your surroundings",
      "  INVENTORY - Check your belongings",
      "  RUMOURS   - Listen to the grapevine",
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
      "  A Sub-Etha Sens-O-Matic (scanning for announcements)",
      "  An empty coffee cup (as is tradition)",
      "  Memories of NIDC 2025",
      "  A lingering sense of anticipation",
      "",
      "Your NIDC 2026 ticket status: NOT YET AVAILABLE",
      "(Nobody's is. Don't panic.)",
    ],
    color: CLR.green,
  },
  RUMOURS: {
    response: () => {
      const rumours = [
        "A passing Betelgeusean whispers: 'I heard there will be even more tracks this year.'",
        "A developer at the bar mutters: 'Apparently the after-party is going to be legendary. Again.'",
        "Someone scrawled on a napkin: 'The CFP will open before you expect it.'",
        "A note stuck to the wall reads: 'The organisers have been suspiciously quiet. That means they're planning something big.'",
        "An anonymous source reports: 'They're already arguing about which talks to accept.'",
        "The grapevine suggests: 'The coffee will be just as good. Maybe better.'",
      ];
      const pick = rumours[Math.floor(Math.random() * rumours.length)];
      return [
        "> listen to rumours",
        "",
        "You press your ear to the fabric of space-time and",
        "listen carefully...",
        "",
        pick,
        "",
        "(Rumours are unverified. The Guide accepts no liability",
        "for disappointment, excitement, or spontaneous hype.)",
      ];
    },
    color: CLR.green,
  },
  NORTH: {
    response: [
      "> go north",
      "",
      "You walk north into the fog. After several steps you",
      "bump into a wall that wasn't there before. A sign on",
      "it reads:",
      "",
      "  NIDC 2026 — THIS AREA IS UNDER CONSTRUCTION",
      "  HARD HATS AND TOWELS REQUIRED BEYOND THIS POINT",
      "",
      "You can't go that way. Yet.",
    ],
    color: CLR.green,
  },
  SOUTH: {
    response: [
      "> go south",
      "",
      "You head south, hoping to find the after-party. Instead",
      "you find only a closed door with a note pinned to it:",
      "",
      "  'After-party details TBA. But trust us, it'll be worth",
      "   the wait. — The Organisers'",
      "",
      "You can't go that way. Yet.",
    ],
    color: CLR.green,
  },
  PARTY: {
    response: () => [
      "> find party",
      "",
      ...classifiedResponse(),
      "",
      "The after-party will happen. Where, when, and how much",
      "pizza — these remain mysteries wrapped in enigmas wrapped",
      "in a towel.",
    ],
    color: CLR.green,
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
      "note that any developer who attends two consecutive NIDC",
      "conferences with towel in hand is clearly a person to",
      "be reckoned with.",
      "",
      "Keep it close. You'll need it for 2026.",
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
      "In the case of NIDC 2026, the question was almost",
      "certainly: 'How many times will I refresh nidevconf.com",
      "waiting for the date announcement?'",
      "",
      "The answer, it turns out, is significantly more than 42.",
    ],
    color: CLR.amber,
  },
  "DON'T PANIC": {
    response: [
      "You take a deep breath.",
      "",
      "The large, friendly letters on the cover of the Guide",
      "glow reassuringly. Yes, the date hasn't been announced.",
      "Yes, you don't know the venue. Yes, the agenda is blank.",
      "",
      "But NIDC 2026 IS happening. In Belfast. With speakers,",
      "and tracks, and coffee, and community.",
      "",
      "Everything is going to be fine.",
      "",
      "Probably.",
      "",
      "(Almost certainly.)",
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
      "The NIDC 2026 after-party drinks menu is, naturally,",
      "classified. But the Guide notes that previous editions",
      "have been 'nearly as good and significantly less fatal'.",
    ],
    color: CLR.green,
  },
  EXIT: {
    response: [
      "> leave",
      "",
      "So long, and thanks for all the talks.",
      "",
      "(See you at NIDC 2026. Whenever that turns out to be.)",
    ],
    color: CLR.amber,
    link: "/",
  },
};

/* ── Component ───────────────────────────────────────────── */
export default function TerminalContent() {
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
      const responseLines =
        typeof entry.response === "function"
          ? entry.response()
          : entry.response;
      const lines = responseLines.map((t) => ({
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
          THE HITCHHIKER&apos;S GUIDE TO NIDC 2026 &mdash; [CLASSIFIED]
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

          {/* Teaser bar */}
          <div
            className="flex items-center justify-center gap-1 py-2 mb-3 text-xs tracking-wider"
            aria-label="NIDC 2026 coming soon"
          >
            <span style={{ color: CLR.dimGreen }}>[ </span>
            <span style={{ color: CLR.amber }}>
              NIDC 2026 — DATE TBA — WATCH THIS SPACE
            </span>
            <span style={{ color: CLR.dimGreen }}> ]</span>
          </div>

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
