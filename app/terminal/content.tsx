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
          | |  NIDC 2026 - 10 YEAR ANNIVERSARY                | |
          | |  LOCATION: ICC BELFAST                          | |
          | |  DATE: SAT 21 NOVEMBER 2026                     | |
          | |                                                 | |
          | |  "The ships hung in the sky in much the same    | |
          | |   way that bricks don't. The conference date,   | |
          | |   however, is now firmly nailed down."          | |
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
    text: "Release 44 / Serial No. 20261121",
    color: CLR.dimGreen,
    delay: 1800,
  },
  { text: "", color: CLR.green, delay: 2200 },
  {
    text: "ICC Belfast",
    color: CLR.amber,
    delay: 2600,
  },
  {
    text: "You are standing outside ICC Belfast. The fog that once",
    color: CLR.green,
    delay: 3200,
  },
  {
    text: "shrouded this place has lifted, and a noticeboard",
    color: CLR.green,
    delay: 3800,
  },
  {
    text: "announces in large, friendly letters:",
    color: CLR.green,
    delay: 4400,
  },
  {
    text: "SATURDAY 21 NOVEMBER 2026.",
    color: CLR.brightGreen,
    delay: 5000,
  },
  { text: "", color: CLR.green, delay: 5400 },
  {
    text: "The Vogon Information Bureau has, grudgingly, stamped",
    color: CLR.green,
    delay: 5600,
  },
  {
    text: "almost every file DECLASSIFIED. Ten years of conference,",
    color: CLR.green,
    delay: 6200,
  },
  {
    text: "and it is all happening again: speakers, and tracks,",
    color: CLR.green,
    delay: 6800,
  },
  {
    text: "and almost certainly coffee.",
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
    text: "There are three large signs here. They read:",
    color: CLR.green,
    delay: 8800,
  },
  {
    text: "  EARLY BIRD TICKETS: ON SALE NOW",
    color: CLR.amber,
    delay: 9400,
  },
  {
    text: "  CALL FOR SPEAKERS: CLOSED",
    color: CLR.amber,
    delay: 9800,
  },
  {
    text: "  CALL FOR SPONSORS: OPEN",
    color: CLR.amber,
    delay: 10200,
  },
  { text: "", color: CLR.green, delay: 10600 },
  {
    text: ">",
    color: CLR.white,
    delay: 10800,
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
      "You reach for a ticket and, remarkably, your hand does",
      "not pass through empty air. Early bird tickets for",
      "NIDC 2026 are ON SALE NOW.",
      "",
      "The Guide notes: 'Early bird pricing, much like the",
      "Restaurant at the End of the Universe, will not be",
      "there forever.'",
      "",
      "Transporting you to the ticket desk...",
    ],
    color: CLR.brightGreen,
    link: "https://ti.to/nidc/nidc-2026-10th-anniversary",
  },
  REGISTER: {
    response: [
      "> register",
      "",
      "Registration is OPEN. The Guide recommends acting with",
      "the urgency of a man who knows exactly when the Vogon",
      "demolition fleet is due.",
      "",
      "Transporting you to the ticket desk...",
    ],
    color: CLR.brightGreen,
    link: "https://ti.to/nidc/nidc-2026-10th-anniversary",
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
      "The Guide adds: 'Declassification of the agenda is",
      "scheduled for September. Probably worth the wait.'",
    ],
    color: CLR.green,
  },
  SPEAKERS: {
    response: [
      "> look up speakers in guide",
      "",
      "The Guide has this to say about the speakers at NIDC 2026:",
      "",
      "THE CALL FOR SPEAKERS HAS CLOSED. The talks will be",
      "brilliant. They will share hard-won wisdom freely",
      "among peers, which is frankly the sort of thing that",
      "restores your faith in carbon-based life forms.",
      "",
      "The line-up is being declassified in September.",
    ],
    color: CLR.green,
  },
  SPEAK: {
    response: [
      "> submit talk",
      "",
      "A wise instinct, but the call for speakers has closed.",
      "The organisers are already arguing about which talks",
      "to accept. Type SPEAKERS for the Guide's entry, or",
      "TICKETS to make sure you are in the room to hear them.",
    ],
    color: CLR.green,
  },
  SPONSOR: {
    response: [
      "> sponsor conference",
      "",
      "An excellent instinct. The Guide's market research",
      "notes that the room will contain the finest collection",
      "of carbon-based developers in Northern Ireland, and",
      "the call for sponsors is OPEN.",
      "",
      "Put your brand in the room: email",
      "sponsors@nidevconf.com and the organisers will take",
      "it from there.",
    ],
    color: CLR.amber,
  },
  DATE: {
    response: [
      "> ask about date",
      "",
      "You consult the Guide's calendar for NIDC 2026.",
      "",
      "  Date: Saturday 21 November 2026",
      "  Time: 08:00 to 17:00",
      "",
      "The Guide notes: 'Time is an illusion. Lunchtime",
      "doubly so. This date, however, is entirely real.",
      "Put it in whichever calendar you trust most.'",
    ],
    color: CLR.amber,
  },
  LOCATION: {
    response: [
      "> examine surroundings",
      "",
      "You determine exactly where NIDC 2026 will take place.",
      "",
      "  Location: ICC Belfast, 2 Lanyon Place, BT1 3WH",
      "",
      "It's in Belfast. It always has been. It always will",
      "be. Some things are constants in an uncertain",
      "universe; this year the constant has a postcode.",
    ],
    color: CLR.green,
  },
  VENUE: {
    response: [
      "> look for venue",
      "",
      "The Guide's entry reads: ICC Belfast (Waterfront",
      "Hall), 2 Lanyon Place. Mostly harmless. Excellent",
      "acoustics.",
      "",
      "The organisers are no longer keeping this one close",
      "to their chest. The Dentrassi cooking pot has been",
      "handed round for all to see.",
    ],
    color: CLR.green,
  },
  LOOK: {
    response: [
      "> look",
      "",
      "Lanyon Place, Belfast",
      "",
      "You are standing outside ICC Belfast. The fog has",
      "lifted, and the air hums with anticipation of the",
      "10 year anniversary conference.",
      "",
      "  To the NORTH: the River Lagan",
      "  To the SOUTH: the after-party (details TBA)",
      "  To the EAST: a queue forming for early bird tickets",
      "  To the WEST: the rest of Belfast",
      "",
      "A sign floats past reading: 'NIDC 2026, SAT 21 NOV,",
      "ICC BELFAST.' It is followed by a smaller sign",
      "reading: 'TELL YOUR TEAM.'",
    ],
    color: CLR.green,
  },
  HELP: {
    response: [
      "The Guide suggests the following interactions:",
      "",
      "  TICKETS   - Get an early bird ticket",
      "  SPONSOR   - Put your brand in the room",
      "  DATE      - Ask about the date",
      "  LOCATION  - Investigate the venue",
      "  AGENDA    - Consult the schedule",
      "  SPEAKERS  - Enquire about speakers",
      "  LOOK      - Examine your surroundings",
      "  INVENTORY - Check your belongings",
      "  RUMOURS   - Listen to the grapevine",
      "  POETRY    - Endure Vogon poetry (not advised)",
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
      "Your NIDC 2026 ticket status: NOT PURCHASED YET",
      "(Early bird tickets are on sale. Type TICKETS.",
      "Don't panic.)",
    ],
    color: CLR.green,
  },
  RUMOURS: {
    response: () => {
      const rumours = [
        "A passing Betelgeusean whispers: 'I heard it's their biggest one yet. Ten years, you know.'",
        "A developer at the bar mutters: 'Apparently the after-party is going to be legendary. Again.'",
        "A note stuck to the wall reads: 'Early bird tickets never last as long as you think they will.'",
        "An anonymous source reports: 'The organisers are already arguing about which talks to accept.'",
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
      "You walk north and arrive at the River Lagan. It is",
      "wet, as rivers famously are. A sign on the railing",
      "reads:",
      "",
      "  NIDC 2026 - SAT 21 NOV - ICC BELFAST",
      "  TOWELS OPTIONAL BUT ENCOURAGED",
      "",
      "The conference is the other way.",
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
      "   the wait. Signed, The Organisers'",
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
      "pizza: these remain mysteries wrapped in enigmas wrapped",
      "in a towel.",
    ],
    color: CLR.green,
  },
  POETRY: {
    response: [
      "> listen to vogon poetry",
      "",
      "A Vogon guard straps you into a small chair. Prostetnic",
      "Vogon Jeltz clears all three of his throats and recites",
      "his latest composition, 'Ode to a Developer Conference':",
      "",
      "  Oh splenetic gribblesnort of keynote dawn,",
      "  thy lanyard flaps upon my quivering jowls",
      "  like a badly deployed microservice.",
      "  See how the early bird plurdles its ticket,",
      "  gurgling greatly upon the sponsored coffee urn!",
      "  Groop, I implore thee, my frupious agenda,",
      "  and hurl me gronkingly to the fourth breakout room,",
      "  for I shall raise a pull request against thy spleen,",
      "  else I shall rend thee in the merge conflicts,",
      "  see if I don't!",
      "",
      "You survive. Barely. The Guide notes that attending",
      "NIDC 2026 is statistically far more pleasant, and that",
      "the speakers there are considerably better at it.",
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
      "certainly: 'How many sleeps until Saturday 21 November?'",
      "",
      "Deep Thought is still working on that one. Your",
      "calendar app will be faster.",
    ],
    color: CLR.amber,
  },
  "DON'T PANIC": {
    response: [
      "You take a deep breath.",
      "",
      "The large, friendly letters on the cover of the Guide",
      "glow reassuringly. The date is set. The venue is",
      "booked. The calls for speakers and sponsors are open.",
      "",
      "NIDC 2026 IS happening. Saturday 21 November, ICC",
      "Belfast. With speakers, and tracks, and coffee, and",
      "community.",
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
      "(See you on Saturday 21 November. Bring your towel.)",
    ],
    color: CLR.amber,
    link: "/",
  },
};

// the words people will actually type
COMMANDS.CFP = COMMANDS.SPEAK;
COMMANDS.SUBMIT = COMMANDS.SPEAK;
COMMANDS.SPONSORS = COMMANDS.SPONSOR;
COMMANDS.TICKET = COMMANDS.TICKETS;
COMMANDS.POEM = COMMANDS.POETRY;
COMMANDS.VOGON = COMMANDS.POETRY;

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
          THE HITCHHIKER&apos;S GUIDE TO NIDC 2026 &middot; [DECLASSIFIED]
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
            aria-label="NIDC 2026, Saturday 21 November, ICC Belfast, early bird tickets on sale"
          >
            <span style={{ color: CLR.dimGreen }}>[ </span>
            <span style={{ color: CLR.amber }}>
              NIDC 2026 · SAT 21 NOV · ICC BELFAST · EARLY BIRD ON SALE
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
