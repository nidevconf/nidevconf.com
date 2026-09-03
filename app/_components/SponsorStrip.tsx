/* eslint-disable @next/next/no-img-element */

// Heights are hand-tuned per logo so wordmarks, badges and stacked marks read as
// the same visual size. Mono black files; dark theme inverts them in CSS.
const SPONSORS = [
  { name: "Gearset", file: "gearset-black.svg", h: 32 },
  { name: "Magnite", file: "magnite-black.svg", h: 28 },
  { name: "Payroc", file: "payroc-black.svg", h: 46 },
  { name: "Enso Recruitment", file: "enso-black.png", h: 32 },
  { name: "Allstate Northern Ireland", file: "allstateni-black.png", h: 44 },
  { name: "DailyPay", file: "dailypay-black.svg", h: 27 },
  { name: "Enably", file: "enably-black.svg", h: 28 },
  { name: "Coding Fury", file: "codingfury-black.png", h: 32 },
  { name: "Uptime Labs", file: "uptimelabs-black.svg", h: 40 },
];

export default function SponsorStrip() {
  // Two copies of the row; the track slides one row-width and snaps back,
  // so the second copy is there only to fill the gap the first leaves.
  const row = (dup: boolean) => (
    <div className="sponsor-row" aria-hidden={dup || undefined}>
      {SPONSORS.map((s) => (
        <img
          key={s.name}
          src={`/images/sponsors/${s.file}`}
          alt={dup ? "" : s.name}
          style={{ height: s.h }}
        />
      ))}
    </div>
  );
  return (
    <section className="sponsor-strip" aria-label="Sponsors">
      <div className="sponsor-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
