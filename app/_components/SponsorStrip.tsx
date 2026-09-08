/* eslint-disable @next/next/no-img-element */

export type Tier = "headline" | "gold" | "silver";

// Heights are hand-tuned per logo so wordmarks, badges and stacked marks read as
// the same visual size. Each logo is a light/dark pair: the brand's colour file
// on light, white mono on dark. CSS shows one per theme. The tier is what they
// sponsored at; the strip ignores it, the article's tiered figure does not.
export const SPONSORS: {
  name: string;
  url: string;
  light: string;
  dark: string;
  h: number;
  tier: Tier;
}[] = [
  { name: "Gearset", url: "https://gearset.com/", light: "gearset.svg", dark: "gearset-white.svg", h: 32, tier: "headline" },
  { name: "Magnite", url: "https://www.magnite.com/", light: "magnite.svg", dark: "magnite-white.svg", h: 28, tier: "gold" },
  { name: "Payroc", url: "https://payroc.com/", light: "payroc.svg", dark: "payroc-white.svg", h: 46, tier: "gold" },
  { name: "Enso Recruitment", url: "https://www.ensorecruitment.com/", light: "enso.png", dark: "enso-white.png", h: 32, tier: "gold" },
  { name: "Allstate Northern Ireland", url: "https://www.allstateni.com/", light: "allstate.svg", dark: "allstate-white.svg", h: 32, tier: "silver" },
  { name: "DailyPay", url: "https://www.dailypay.com/", light: "dailypay.svg", dark: "dailypay-white.svg", h: 27, tier: "silver" },
  { name: "Enably", url: "https://enablyco.com/", light: "enably.svg", dark: "enably-white.svg", h: 28, tier: "silver" },
  { name: "Coding Fury", url: "https://www.codingfury.com/", light: "codingfury-black.png", dark: "codingfury-white.png", h: 32, tier: "silver" },
  { name: "Uptime Labs", url: "https://www.uptimelabs.io/", light: "uptimelabs.svg", dark: "uptimelabs-white.svg", h: 40, tier: "silver" },
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
