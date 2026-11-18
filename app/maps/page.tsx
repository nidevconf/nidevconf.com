/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

const description =
  "Floor maps for NIDC on Saturday, 21st November 2026 at the International Convention Centre Belfast: registration, talks, villages, exhibitors and support rooms across Levels 0 to 3.";

export const metadata: Metadata = {
  title: "Maps",
  description,
  alternates: { canonical: "https://nidevconf.com/maps" },
  openGraph: {
    title: "Maps | NIDC 2026",
    description,
    url: "https://nidevconf.com/maps",
  },
};

// Files live in public/maps/ as <id>.png (1920px wide).
type VenueMap = {
  id: string;
  nav: string;
  title: string;
  subtitle?: string;
  alt: string;
  width: number;
  height: number;
};

const levels: VenueMap[] = [
  {
    id: "level-0",
    nav: "Level 0",
    title: "Level 0",
    subtitle: "Registration",
    alt: "Level 0 floor map: Registration at the top of the escalators, the Riverside Entrance, lifts, toilets and Changing Places toilet. Waterfront Hall is shown for reference only.",
    width: 1920,
    height: 1045,
  },
  {
    id: "level-1",
    nav: "Level 1",
    title: "Level 1",
    subtitle: "Talks, Villages & Exhibition Hall",
    alt: "Level 1 floor map: the Retro, Maker and Security villages, the Info Desk, Exhibitors and Catering, and the Hall 1A and Hall 1B talk tracks.",
    width: 1920,
    height: 1045,
  },
  {
    id: "level-2",
    nav: "Level 2",
    title: "Level 2",
    subtitle: "Support Rooms",
    alt: "Level 2 floor map: the Quiet Room, Speaker Green Room and Breastfeeding Space.",
    width: 1920,
    height: 1045,
  },
  {
    id: "level-3",
    nav: "Level 3",
    title: "Level 3",
    subtitle: "Talks, Labs and Childcare",
    alt: "Level 3 floor map: Conference Room 1A and 1B talk tracks, Conference Room 2A workshops, the Kids' Village and the quiet and main childcare rooms.",
    width: 1920,
    height: 1045,
  },
];

function MapSection({ map }: { map: VenueMap }) {
  return (
    <section id={map.id} className="venue-map" style={{ marginTop: 56, scrollMarginTop: 96 }}>
      <h2 className="sec-title" style={{ fontSize: "clamp(26px, 4vw, 36px)" }}>
        {map.title}
      </h2>
      {map.subtitle ? (
        <p className="sec-lead" style={{ marginTop: 8 }}>
          {map.subtitle}
        </p>
      ) : null}
      <a
        href={`/maps/${map.id}.png`}
        aria-label={`Open the ${map.title} map full size`}
        style={{ display: "block", marginTop: 20 }}
      >
        <img
          src={`/maps/${map.id}.png`}
          width={map.width}
          height={map.height}
          alt={map.alt}
          loading={map.id === "level-0" ? undefined : "lazy"}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            borderRadius: "var(--r)",
          }}
        />
      </a>
    </section>
  );
}

export default function MapsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> maps
            </p>
            <h1 className="sec-title">
              Venue <span className="hl">maps</span>.
            </h1>
            <p className="sec-lead">
              Find your way around the International Convention Centre Belfast on the day.
            </p>
            <nav aria-label="Jump to a map">
              <div className="btn-row">
                {levels.map((m, i) => (
                  <a key={m.id} className={`btn ${i === 0 ? "btn-primary" : "btn-secondary"}`} href={`#${m.id}`}>
                    {m.nav}
                  </a>
                ))}
              </div>
            </nav>

            {levels.map((m) => (
              <MapSection key={m.id} map={m} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
