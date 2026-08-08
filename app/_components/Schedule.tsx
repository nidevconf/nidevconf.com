import type { CSSProperties } from "react";

const TRACKS = ["Hall 1", "Hall 2", "Room 1", "Room 2", "Workshops"];
const WORKSHOP_TRACK = TRACKS.indexOf("Workshops");
// same destination as the "Submit a talk or workshop" buttons in page.tsx
const CFP = "https://sessionize.com/nidc-2026/";

/* Each empty slot's pitch carries a face, and no two slots share one. Dealt by
   position rather than hashed: a hash cannot promise uniqueness, and with 32
   slots the pigeonhole guarantees collisions unless the list is dealt out.
   Plain text, so each visitor gets their own platform's emoji font — which is
   what puts the Apple artwork on Apple devices without shipping Apple's files. */
const FACES = [
  ..."\u{1F600}\u{1F603}\u{1F604}\u{1F601}\u{1F606}\u{1F605}\u{1F923}\u{1F602}\u{1F642}\u{1F643}",
  ..."\u{1F609}\u{1F60A}\u{1F607}\u{1F970}\u{1F60D}\u{1F929}\u{1F618}\u{1F617}\u{1F61A}\u{1F619}",
  ..."\u{1F972}\u{1F60B}\u{1F61B}\u{1F61C}\u{1F92A}\u{1F917}\u{1F914}\u{1F920}\u{1F973}\u{1F60E}",
  ..."\u{1F913}\u{1F9D0}\u{1F92D}\u{1FAE2}\u{1F92B}\u{1F610}\u{1F611}\u{1F636}\u{1F644}\u{1F60F}",
];

const at = (h: number, m = 0) => h * 60 + m;

type Item = {
  start: number;
  end: number;
  /** omit to run a band across every track */
  track?: number;
  title: string;
  /** Where to DRAW something whose real span would wreck the timeline: the
   *  after-party sits two hours after the last talk. It still prints its true
   *  time. */
  layout?: [number, number];
};

const TALK_STARTS = [at(10), at(10, 45), at(11, 30), at(13), at(13, 45), at(14, 45), at(15, 30)];
const WORKSHOPS: [number, number][] = [
  [at(10), at(11)],
  [at(11, 15), at(12, 15)],
  [at(13), at(14)],
  [at(14, 45), at(15, 45)],
];

/* Talks are 30 minutes with a 15 minute gap, which fixes the whole day: a 15
   minute opening is the only length that lands the third talk exactly on the
   12:00 lunch. Workshops keep their own cadence — 11:15 starts inside a talk
   break and runs into lunch — and simply span the rows they cover. */
const ITEMS: Item[] = [
  { start: at(8, 30), end: at(9), title: "Registration" },
  { start: at(9), end: at(9, 30), title: "Coffee" },
  { start: at(9, 30), end: at(9, 45), track: 0, title: "Opening" },
  ...TALK_STARTS.flatMap((start) =>
    [0, 1, 2, 3].map((track) => ({ start, end: start + 30, track, title: "TBA" })),
  ),
  ...WORKSHOPS.map(([start, end]) => ({ start, end, track: 4, title: "TBA" })),
  { start: at(12), end: at(13), title: "Lunch" },
  { start: at(14, 15), end: at(14, 45), title: "Afternoon break" },
  // finishes at 17:00; the day's 15 minute gap after the last talk sets the start
  { start: at(16, 15), end: at(17), track: 0, title: "Closing & prizes" },
  { start: at(18), end: at(22), title: "After-party", layout: [at(17), at(17, 30)] },
];

// The stacked layout drops the grid and reads in DOM order, so a phone would
// otherwise get every talk of the day before lunch turns up.
ITEMS.sort((a, b) => a.start - b.start || (a.track ?? -1) - (b.track ?? -1));

const span = (i: Item) => i.layout ?? [i.start, i.end];

/* Stepping 13 at a time through 40 faces is a permutation (they share no common
   factor), so every slot gets a different one AND neighbours sit far apart in the
   list — dealing them in order would march the same sequence across every row. */
const FACE_OF = new Map(
  ITEMS.filter((i) => i.title === "TBA").map(
    (i, n) => [`${i.track}-${i.start}`, FACES[(n * 13) % FACES.length]] as const,
  ),
);

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

/* The bookends are real, named sessions, so they stay on the page; only the
   middle of the day — every unannounced talk and workshop, plus the lunch and
   break woven between them — folds away behind the preview. */
const FIRST_TALK = Math.min(...TALK_STARTS);
const LAST_TALK_END = Math.max(...TALK_STARTS) + 30;
const MORNING = ITEMS.filter((i) => i.start < FIRST_TALK);
const MIDDLE = ITEMS.filter((i) => i.start >= FIRST_TALK && i.start < LAST_TALK_END);
const EVENING = ITEMS.filter((i) => i.start >= LAST_TALK_END);

const MID_START = Math.min(...MIDDLE.map((i) => i.start));
const MID_END = Math.max(...MIDDLE.map((i) => i.end));

export default function Schedule() {
  return (
    <div className="agenda-sched">
      {/* headers live outside the fold, so they read for both states */}
      <div className="ag-headrow">
        <span />
        {TRACKS.map((track) => (
          <span key={track}>{track}</span>
        ))}
      </div>

      <Grid items={MORNING} />

      <details className="agenda-preview">
        {/* spans, not divs: summary's content model is phrasing content */}
        <summary>
          {/* what the fold covers, on the same rail the grids use */}
          <span className="ap-rail">
            <span>{clock(MID_START)}</span>
            <span>{clock(MID_END)}</span>
          </span>
          <span className="ap-box">
            <span className="ap-more" />
          </span>
        </summary>
        <Grid items={MIDDLE} />
      </details>

      <Grid items={EVENING} />
    </div>
  );
}

/* Each block is its own grid so its rows stay proportional to its own span. They
   line up with each other because the time gutter is a fixed width. */
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
    <div className="agenda-grid" style={{ "--ag-rows": rowSizes } as CSSProperties}>
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
        const tba = item.title === "TBA";
        const [from, to] = span(item);
        const key = `${item.start}-${item.track ?? "all"}-${item.end}`;
        const props = {
          className: `ag-item ${band ? "ag-band" : "ag-talk"}${tba ? " ag-tba" : ""}`,
          "data-track": band ? undefined : TRACKS[item.track!],
          style: {
            "--c": band ? "2 / -1" : item.track! + 2,
            "--r1": row(from),
            "--r2": row(to),
          } as CSSProperties,
        };
        const inner = (
          <>
            <p className="ag-when">
              {clock(item.start)} ({length(item.end - item.start)})
            </p>
            {/* an unfilled slot says so with its dashed outline, not with a word */}
            {!tba && <p className="ag-title">{item.title}</p>}
          </>
        );

        // An empty slot is a pitch for that exact spot. Each carries its own label
        // so a screen reader gets thirty distinct invitations, not thirty
        // identical "Submit a talk" links.
        return tba ? (
          <a
            key={key}
            {...props}
            href={CFP}
            data-face={FACE_OF.get(`${item.track}-${item.start}`)}
            aria-label={`Submit a ${item.track === WORKSHOP_TRACK ? "workshop" : "talk"} for the ${clock(item.start)} slot in ${TRACKS[item.track!]}`}
          >
            {inner}
          </a>
        ) : (
          <div key={key} {...props}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
