/* eslint-disable @next/next/no-img-element */

// Heights are hand-tuned per logo so wordmarks, badges and stacked marks read as
// the same visual size. Each logo is a light/dark pair: the brand's colour file
// on light, white mono on dark. CSS shows one per theme.
const SPONSORS = [
  { name: "Gearset", light: "gearset.svg", dark: "gearset-white.svg", h: 32 },
  { name: "Magnite", light: "magnite.svg", dark: "magnite-white.svg", h: 28 },
  { name: "Payroc", light: "payroc.svg", dark: "payroc-white.svg", h: 46 },
  { name: "Enso Recruitment", light: "enso.png", dark: "enso-white.png", h: 32 },
  { name: "Allstate Northern Ireland", light: "allstate.svg", dark: "allstate-white.svg", h: 32 },
  { name: "DailyPay", light: "dailypay.svg", dark: "dailypay-white.svg", h: 27 },
  { name: "Enably", light: "enably.svg", dark: "enably-white.svg", h: 28 },
  { name: "Coding Fury", light: "codingfury-black.png", dark: "codingfury-white.png", h: 32 },
  { name: "Uptime Labs", light: "uptimelabs.svg", dark: "uptimelabs-white.svg", h: 40 },
];

export default function SponsorStrip() {
  // Two copies of the row; the track slides one row-width and snaps back,
  // so the second copy is there only to fill the gap the first leaves.
  const row = (dup: boolean) => (
    <div className="sponsor-row" aria-hidden={dup || undefined}>
      {SPONSORS.flatMap((s) =>
        (["light", "dark"] as const).map((theme) => (
          <img
            key={s.name + theme}
            className={theme}
            src={`/images/sponsors/${s[theme]}`}
            alt={dup ? "" : s.name}
            style={{ height: s.h }}
          />
        )),
      )}
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
