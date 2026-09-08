/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SPONSORS, type Tier } from "./SponsorStrip";

/* This year's sponsors by tier, three sizes from the headline down, and an empty slot at
   the end for the next one, drawn like an unfilled agenda slot. The same light/dark logo
   pairs as the strip; CSS shows one per theme. */
const SCALE: Record<Tier, number> = { headline: 2, gold: 1.4, silver: 1 };
const TIERS: Tier[] = ["headline", "gold", "silver"];

export default function SponsorTiers() {
  return (
    <figure className="sponsor-tiers">
      {TIERS.map((tier, i) => (
        <div key={tier} className="tier">
          {SPONSORS.filter((s) => s.tier === tier).map((s) => (
            <a key={s.name} className="logo" href={s.url} target="_blank" rel="noopener">
              <img
                className="light"
                src={`/images/sponsors/${s.light}`}
                alt={s.name}
                style={{ height: s.h * SCALE[tier] }}
              />
              <img
                className="dark"
                src={`/images/sponsors/${s.dark}`}
                alt=""
                aria-hidden
                style={{ height: s.h * SCALE[tier] }}
              />
            </a>
          ))}
          {i === TIERS.length - 1 && (
            <Link href="/#sponsor" className="sponsor-slot">
              Be a sponsor
              <span>sponsors@nidevconf.com</span>
            </Link>
          )}
        </div>
      ))}
      <figcaption>NIDC 2026 sponsors</figcaption>
    </figure>
  );
}
