/* eslint-disable @next/next/no-img-element */

export type Tier = "headline" | "headline-recruitment" | "gold" | "silver" | "bronze";

// How much bigger or smaller each tier's logos run in the strip, so the tier reads at a glance.
export const STRIP_SCALE: Record<Tier, number> = {
  headline: 1.3,
  "headline-recruitment": 1.3,
  gold: 1.1,
  silver: 0.9,
  bronze: 0.75,
};

// Heights are hand-tuned per logo so wordmarks, badges and stacked marks read as
// the same visual size; the tier's scale goes on top. Each logo is a light/dark pair:
// the brand's colour file on light, white mono on dark. CSS shows one per theme.
// Listed in tier order, so the strip runs from the headline down.
export const SPONSORS: {
  name: string;
  url: string;
  // No logo pair yet: the name is set as text in the display face until one is added.
  light?: string;
  dark?: string;
  h: number;
  tier: Tier;
}[] = [
  { name: "Gearset", url: "https://gearset.com/", light: "gearset.svg", dark: "gearset-white.svg", h: 32, tier: "headline" },
  { name: "Enso Recruitment", url: "https://www.ensorecruitment.com/", light: "enso.png", dark: "enso-white.png", h: 32, tier: "headline-recruitment" },
  { name: "Payroc", url: "https://payroc.com/", light: "payroc.svg", dark: "payroc-white.svg", h: 46, tier: "gold" },
  { name: "Magnite", url: "https://www.magnite.com/", light: "magnite.svg", dark: "magnite-white.svg", h: 28, tier: "gold" },
  { name: "Kainos", url: "https://www.kainos.com/", light: "kainos.png", dark: "kainos-white.png", h: 28, tier: "gold" },
  { name: "Liberty IT", url: "https://www.liberty-it.co.uk/", light: "liberty.png", dark: "liberty-white.png", h: 52, tier: "silver" },
  { name: "DailyPay", url: "https://www.dailypay.com/", light: "dailypay.svg", dark: "dailypay-white.svg", h: 27, tier: "silver" },
  { name: "Allstate Northern Ireland", url: "https://www.allstateni.com/", light: "allstate.svg", dark: "allstate-white.svg", h: 32, tier: "silver" },
  { name: "Phorest", url: "https://www.phorest.com/", light: "phorest.png", dark: "phorest-white.png", h: 32, tier: "silver" },
  { name: "Enably", url: "https://enablyco.com/", light: "enably.svg", dark: "enably-white.svg", h: 28, tier: "bronze" },
  { name: "Uptime Labs", url: "https://www.uptimelabs.io/", light: "uptimelabs.svg", dark: "uptimelabs-white.svg", h: 40, tier: "bronze" },
  { name: "Coding Fury", url: "https://www.codingfury.com/", light: "codingfury-black.png", dark: "codingfury-white.png", h: 32, tier: "bronze" },
  { name: "BCS NI", url: "https://www.bcs.org/", light: "bcs-ni.png", dark: "bcs-ni-white.png", h: 52, tier: "bronze" },
];

// One labelled row per tier, biggest first, the label centred above its logos.
const ROWS: { label: string; tier: Tier }[] = [
  { label: "Headline", tier: "headline" },
  { label: "Gold", tier: "gold" },
  { label: "Exclusive Recruitment Partner", tier: "headline-recruitment" },
  { label: "Silver", tier: "silver" },
  { label: "Bronze", tier: "bronze" },
];

export default function SponsorStrip() {
  return (
    <section className="sponsor-strips" aria-labelledby="sponsors-title">
      <h2 className="sec-title" id="sponsors-title">
        Sponsors
      </h2>
      {ROWS.map(({ label, tier }) => {
        const sponsors = SPONSORS.filter((s) => s.tier === tier);
        if (!sponsors.length) return null;
        return (
          <div key={label} className="sponsor-strip-row">
            <h3 className="sponsor-strip-label">{label}</h3>
            <div className="sponsor-row">
              {sponsors.map((s) => (
                <a key={s.name} className="sponsor-item" href={s.url} target="_blank" rel="noopener">
                  {s.light && s.dark ? (
                    (["light", "dark"] as const).map((theme) => (
                      <img
                        key={theme}
                        className={theme}
                        src={`/images/sponsors/${s[theme]}`}
                        alt={theme === "dark" ? "" : s.name}
                        style={{ height: s.h * STRIP_SCALE[s.tier] }}
                      />
                    ))
                  ) : (
                    <span className="sponsor-name" style={{ fontSize: s.h * STRIP_SCALE[s.tier] * 0.75 }}>
                      {s.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
