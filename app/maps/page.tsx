/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

// To update the floor map, drop the new file in public/maps/ and change this.
// Use a PNG/JPEG (shown inline) or a PDF (embedded, with a download link).
const FLOORMAP = {
  src: "/maps/floormap.png",
  alt: "Floor map of the International Convention Centre Belfast for NIDC 2026, showing the talk rooms, villages and sponsor areas",
  width: 1600,
  height: 1000,
};

const isPdf = FLOORMAP.src.toLowerCase().endsWith(".pdf");

const description =
  "Floor map for NIDC on Saturday, 21st November 2026 at the International Convention Centre Belfast.";

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
              Floor <span className="hl">map</span>.
            </h1>
            <p className="sec-lead">Find your way around the ICC Belfast on the day.</p>
            <div className="btn-row">
              <a className="btn btn-secondary" href={FLOORMAP.src} download>
                Download the map
              </a>
            </div>

            <figure className="statement-photo">
              {isPdf ? (
                <object
                  data={FLOORMAP.src}
                  type="application/pdf"
                  aria-label={FLOORMAP.alt}
                  style={{ width: "100%", height: "80vh", minHeight: 480 }}
                >
                  <p>
                    Your browser can’t show PDFs inline.{" "}
                    <a href={FLOORMAP.src}>Open the floor map</a>.
                  </p>
                </object>
              ) : (
                <a href={FLOORMAP.src} aria-label="Open the floor map full size">
                  <img
                    src={FLOORMAP.src}
                    width={FLOORMAP.width}
                    height={FLOORMAP.height}
                    alt={FLOORMAP.alt}
                    style={{ width: "100%", height: "auto" }}
                  />
                </a>
              )}
            </figure>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
