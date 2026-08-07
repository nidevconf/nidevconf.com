import Script from "next/script";
import type { HTMLAttributes } from "react";

// Ti.to ships a custom element; React 19 renders it fine, TS just needs to know it exists.
declare global {
  // augmenting React.JSX is the only way to type a custom element — namespace is required here
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace React.JSX {
    interface IntrinsicElements {
      "tito-widget": HTMLAttributes<HTMLElement> & { event: string };
    }
  }
}

// Ti.to refuses real orders off SSL, so local dev gets their development_mode plugin.
// `next dev` sets NODE_ENV=development; the exported production build never carries it.
const TITO_SRC =
  process.env.NODE_ENV === "development"
    ? "https://js.tito.io/v2/with/inline,development_mode"
    : "https://js.tito.io/v2/with/inline";

export default function Tickets({ id }: { id?: string }) {
  return (
    <section className="section" id={id}>
      <div className="wrap section-centered">
        <h2 className="sec-title">
          Get yer&apos; <span className="hl">tickets</span>
        </h2>
        {/* classic-theme is Ti.to's own hook that strips the light card chrome */}
        <div className="tickets-embed classic-theme">
          <tito-widget event="nidc/nidc-2026-10th-anniversary"></tito-widget>
        </div>
      </div>
      {/* the "inline" build renders into the page instead of an iframe, so our CSS reaches it.
          next/script dedupes by src, so rendering this twice still loads it once. */}
      <Script src={TITO_SRC} strategy="afterInteractive" />
    </section>
  );
}
