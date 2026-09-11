import type { CSSProperties } from "react";
import sessions from "../_data/sessions.json";
import TalkCard, { type Session } from "./TalkCard";

const TRACKS = ["Hall 1A", "Hall 1B", "Room 1A", "Room 1B", "Workshops"];

const at = (h: number, m = 0) => h * 60 + m;

type Item = {
  start: number;
  end: number;
  /** omit to run a band across every track */
  track?: number;
  title: string;
  session?: Session;
  /** Where to DRAW something whose real span would wreck the timeline: the
   *  after-party sits two hours after the last talk. It still prints its true
   *  time. */
  layout?: [number, number];
};

const TALK_STARTS = [
  at(10),
  at(10, 45),
  at(11, 30),
  at(13),
  at(13, 45),
  at(14, 30),
  at(15, 30),
  at(16, 10),
];
const WORKSHOPS: [number, number][] = [
  [at(10), at(11)],
  [at(11, 15), at(12, 15)],
  [at(13), at(14)],
  [at(14, 15), at(15, 15)],
  [at(15, 30), at(16, 30)],
];

/* Lightning talks all sit in Room 1B between lunch and the afternoon break:
   three to a 30 minute slot, 5 minutes apart, so the third runs 10 minutes
   into the gap that follows — and at 14:30, into the break itself. */
const FLASH_TRACK = 3;
const FLASH_SLOTS = TALK_STARTS.filter((t) => t >= at(13) && t < at(15));
const FLASH_MIN = 10;
const FLASH_GAP = 5;

// ponytail: nothing is timetabled in Sessionize yet. A few sessions are placed
// by hand here (Sessionize id -> start, track); the rest of each format fills
// its slots in title order and the leftovers say "Coming soon". Once the export carries
// a room and start, place by those instead.
const PINNED: Record<string, [start: number, track: number]> = {
  "1272502": [at(13), 4], // OWASP PTK Hands-On — straight after lunch
  "1331058": [at(11, 15), 4], // Python and Electronics workshop
  "1281884": [at(10, 45), 0], // Deprecated: The role was redundant. Not me.
  "1315618": [at(15, 30), 1], // You Are Not Netflix
  "1307120": [at(16, 10), 0], // Decoding Irish Trad — closes Hall 1A
  "1309913": [at(16, 10), 1], // Follow the Twenty Quid: The AI Bill That Doesn't Add Up
  "1290323": [at(16, 10), 2], // One Architecture, Any Silo (Megan D'Arcy)
  "1311202": [at(10, 45), 3], // This code is a crime scene!
  "1310014": [at(11, 30), 3], // Getting Shit Done in Two Worlds
  "1309513": [at(13, 30), 3], // Less Engine, More Game (lightning)
  "1307192": [at(13, 45), 3], // In Good Taste (lightning)
  "1283814": [at(14, 45), 3], // The Shortcut Tax (lightning)
  "1310846": [at(14), 3], // The Weird Creature You Have to Keep Alive Is You (lightning)
  "1266968": [at(14, 15), 3], // Product Market Fit (lightning)
  "1310995": [at(15), 3], // The 'Enlightenment' of LLMs (lightning)
  "1309264": [at(13), 3], // Cyberdecks (lightning)
  "1271354": [at(14, 30), 3], // Agentic AI lessons from my smart home (lightning)
  "1284658": [at(13, 15), 3], // When Your Software Starts Looking Like Your Org Chart (lightning)
  "1293818": [at(10, 45), 2], // Local AI at the End of the Tunnel
  "1308541": [at(11, 30), 2], // Don't Let the Bots Win
  "1296109": [at(15, 30), 2], // Is this the CVE-nd?
  "1311214": [at(13), 2], // Taste in the Age of AI
  "1306805": [at(10), 3], // Ranking Every Trainer in Pokemon Red
  "1311194": [at(15, 30), 3], // Debugging Feelings
  "1307140": [at(15, 30), 0], // Two Radios and a Terminal
  "1308347": [at(13, 45), 2], // All the data in the world
  "1299723": [at(14, 30), 2], // How to Be a Good Citizen Contributor to Open Source
  "1306848": [at(10), 1], // Erased From the Commit Log (Adam D'Arcy)
  "1303858": [at(13, 45), 1], // From Zero to Container: A Java Quarkus Deep Dive (Jason Bell)
  "1311260": [at(13, 45), 0], // Terminal Panic
  "1310638": [at(14, 30), 0], // Making the Smart Dumb Thing Smart
  "iz-wright": [at(11, 30), 0], // Shipping Quick, Failing Fast
};
const pinned = (start: number, track: number) =>
  sessions.find((s) => PINNED[s.id]?.[0] === start && PINNED[s.id]?.[1] === track);
// Kept empty: the fill skips these, so the day's leftover gaps land here first.
const HELD: [start: number, track: number][] = [
  [at(10), 0],
  [at(10, 45), 1],
  [at(11, 30), 1],
  [at(13), 0],
  [at(13), 1],
];
const held = (start: number, track: number) =>
  HELD.some(([s, t]) => s === start && t === track);
const queue = (format: string) =>
  sessions.filter((s) => s.format === format && !PINNED[s.id]);
const queues = { Talk: queue("Talk"), Lightning: queue("Lightning"), Workshop: queue("Workshop") };
const slot = (start: number, end: number, track: number, format: keyof typeof queues): Item => {
  const session: Session | undefined = held(start, track)
    ? undefined
    : (pinned(start, track) ?? queues[format].shift());
  return { start, end, track, title: session?.title ?? "Coming soon", session };
};

/* Talks are 30 minutes with a 15 minute gap, which fixes the whole day: a 15
   minute opening is the only length that lands the third talk exactly on the
   12:00 lunch. Workshops keep their own cadence — 11:15 starts inside a talk
   break and runs into lunch — and simply span the rows they cover. */
const ITEMS: Item[] = [
  { start: at(8, 30), end: at(9), title: "Registration" },
  { start: at(9), end: at(9, 30), title: "Coffee" },
  { start: at(9, 30), end: at(9, 45), track: 0, title: "Opening" },
  ...TALK_STARTS.flatMap((start) =>
    [0, 1, 2, 3].flatMap((track) =>
      track === FLASH_TRACK && FLASH_SLOTS.includes(start)
        ? [0, 1, 2].map((i) => {
            const from = start + i * (FLASH_MIN + FLASH_GAP);
            return slot(from, from + FLASH_MIN, track, "Lightning");
          })
        : [slot(start, start + 30, track, "Talk")],
    ),
  ),
  ...WORKSHOPS.map(([start, end]) => slot(start, end, 4, "Workshop")),
  { start: at(12), end: at(13), title: "Lunch" },
  { start: at(15), end: at(15, 30), title: "Afternoon break" },
  // finishes at 17:10; after the break the day runs on 10 minute gaps
  { start: at(16, 50), end: at(17, 10), track: 0, title: "Closing & prizes" },
  { start: at(18), end: at(22), title: "After-party", layout: [at(17, 10), at(17, 40)] },
];

// The stacked layout drops the grid and reads in DOM order, so a phone would
// otherwise get every talk of the day before lunch turns up.
ITEMS.sort((a, b) => a.start - b.start || (a.track ?? -1) - (b.track ?? -1));


/* Each empty slot carries a face, and no two slots share one. Dealt by position
   rather than hashed: a hash cannot promise uniqueness, and with this many slots
   the pigeonhole guarantees collisions unless the list is dealt out. Plain text,
   so each visitor gets their own platform's emoji font. */
const FACES = [
  ..."\u{1F600}\u{1F603}\u{1F604}\u{1F601}\u{1F606}\u{1F605}\u{1F923}\u{1F602}\u{1F642}\u{1F643}",
  ..."\u{1F609}\u{1F60A}\u{1F607}\u{1F970}\u{1F60D}\u{1F929}\u{1F618}\u{1F617}\u{1F61A}\u{1F619}",
  ..."\u{1F972}\u{1F60B}\u{1F61B}\u{1F61C}\u{1F92A}\u{1F917}\u{1F914}\u{1F920}\u{1F973}\u{1F60E}",
  ..."\u{1F913}\u{1F9D0}\u{1F92D}\u{1FAE2}\u{1F92B}\u{1F610}\u{1F611}\u{1F636}\u{1F644}\u{1F60F}",
];
/* Stepping 13 at a time through 40 faces is a permutation (they share no common
   factor), so every slot gets a different one AND neighbours sit far apart in the
   list — dealing them in order would march the same sequence across every row. */
const FACE_OF = new Map(
  ITEMS.filter((i) => i.title === "Coming soon").map(
    (i, n) => [`${i.track}-${i.start}`, FACES[(n * 13) % FACES.length]] as const,
  ),
);

const span = (i: Item) => i.layout ?? [i.start, i.end];

const clock = (m: number) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function length(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const parts = [];
  if (h) parts.push(`${h} hour${h > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} minute${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export default function Schedule() {
  return (
    <div className="agenda-sched">
      <div className="ag-headrow">
        <span />
        {TRACKS.map((track) => (
          <span key={track}>{track}</span>
        ))}
      </div>
      <Grid items={ITEMS} />
    </div>
  );
}

function Grid({ items }: { items: Item[] }) {
  // every start and end is a grid line, so an item spans exactly the bands it
  // covers and a 60 minute workshop sits alongside two 30 minute talks
  const lines = [...new Set(items.flatMap(span))].sort((a, b) => a - b);
  const row = (m: number) => lines.indexOf(m) + 1;
  // each row is as tall as the minutes it represents, so the empty rows between
  // sessions ARE the breaks — no row-gap needed
  const rowSizes = lines
    .slice(1)
    .map((t, i) => `minmax(calc(${t - lines[i]} * var(--ag-min)), auto)`)
    .join(" ");

  return (
    <div
      className="agenda-grid"
      style={{ "--ag-rows": rowSizes } as CSSProperties}
    >
      {/* Label the rail with the session's REAL start, not the row it is drawn on.
          They are the same everywhere except the after-party, which is pulled up
          the grid so it does not open a two-hour void — and there the drawn row
          would have the rail saying 17:00 beside a card saying 18:00. */}
      {[...new Set(items.map((i) => span(i)[0]))].map((line) => (
        <div key={line} className="ag-time" style={{ "--r1": row(line) } as CSSProperties}>
          {clock(items.find((i) => span(i)[0] === line)!.start)}
        </div>
      ))}

      {items.map((item) => {
        const band = item.track === undefined;
        const tba = item.title === "Coming soon";
        const [from, to] = span(item);
        const key = `${item.start}-${item.track ?? "all"}-${item.end}`;
        const style = {
          "--c": band ? "2 / -1" : item.track! + 2,
          "--r1": row(from),
          "--r2": row(to),
        } as CSSProperties;
        const when = `${clock(item.start)} (${length(item.end - item.start)})`;
        if (item.session) {
          return (
            <TalkCard
              key={key}
              session={item.session}
              when={when}
              track={TRACKS[item.track!]}
              flash={item.end - item.start < 30}
              style={style}
            />
          );
        }
        return (
          <div
            key={key}
            className={`ag-item ${band ? "ag-band" : "ag-talk"}${tba ? " ag-tba" : ""}`}
            data-track={band ? undefined : TRACKS[item.track!]}
            style={style}
          >
            {tba ? (
              <>
                {/* same grid as a talk card: the face where the photo goes, the
                    words where the speaker's name goes, the time at the foot */}
                <span className="ag-face ag-emoji" aria-hidden>{FACE_OF.get(`${item.track}-${item.start}`)}</span>
                <span className="ag-who">{item.title}</span>
              </>
            ) : (
              <p className="ag-title">{item.title}</p>
            )}
            <p className="ag-when">{when}</p>
          </div>
        );
      })}
    </div>
  );
}
