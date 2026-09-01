import type { CSSProperties } from "react";

const TRACKS = ["Hall 1", "Hall 2", "Room 1", "Room 2", "Workshops"];

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
  { start: at(15), end: at(15, 30), title: "Afternoon break" },
  // finishes at 17:10; after the break the day runs on 10 minute gaps
  { start: at(16, 50), end: at(17, 10), track: 0, title: "Closing & prizes" },
  { start: at(18), end: at(22), title: "After-party", layout: [at(17, 10), at(17, 40)] },
];

// The stacked layout drops the grid and reads in DOM order, so a phone would
// otherwise get every talk of the day before lunch turns up.
ITEMS.sort((a, b) => a.start - b.start || (a.track ?? -1) - (b.track ?? -1));

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
const EVE_START = Math.min(...EVENING.map((i) => span(i)[0]));

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

      <Grid items={EVENING} lead={EVE_START - MID_END} />
    </div>
  );
}

/* Each block is its own grid so its rows stay proportional to its own span. They
   line up with each other because the time gutter is a fixed width. */
/* `lead` is the real minutes between the previous block and this one. Inside a
   grid a break is an empty row on the --ag-min scale, but the seam between grids
   has no row at all — so the same 10 minute break would draw 8px at the seam and
   30px inside. The margin restores the missing minutes, less the --ag-gap the
   preview's own margin already puts there. */
function Grid({ items, lead }: { items: Item[]; lead?: number }) {
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
      style={
        {
          "--ag-rows": rowSizes,
          marginTop: lead ? `calc(${lead} * var(--ag-min) - var(--ag-gap))` : undefined,
        } as CSSProperties
      }
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
        return (
          <div key={key} {...props}>
            <p className="ag-when">
              {clock(item.start)} ({length(item.end - item.start)})
            </p>
            {/* an unfilled slot says so with its dashed outline, not with a word */}
            {!tba && <p className="ag-title">{item.title}</p>}
          </div>
        );
      })}
    </div>
  );
}
