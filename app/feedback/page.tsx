import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScqrkyE0HrkqukqKx9s2JC3wk-H-UaBVPDobgP9c0AmWwtKmw/viewform";

const description = "Tell us how you got on at NIDC 2026.";

export const metadata: Metadata = {
  title: "Feedback",
  description,
  alternates: { canonical: "https://nidevconf.com/feedback" },
  // openGraph does not merge with the layout's, so the image comes along again
  openGraph: {
    title: "Feedback | NIDC 2026",
    description,
    url: "https://nidevconf.com/feedback",
    images: ["/opengraph-image.jpg"],
  },
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section call">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> feedback
            </p>
            <h1 className="sec-title">
              Share your <span className="hl">feedback</span>.
            </h1>
            <p className="sec-lead">Tell us how you got on at NIDC.</p>

            {/* Google Forms supports embedding via ?embedded=true. A cross-origin iframe can't
                auto-size, so the height in site.css fits the form's single page (measured
                at ~1970px desktop and up to ~2800px on the narrowest phones). Update it
                if the form gets longer. */}
            <iframe
              src={`${FORM}?embedded=true`}
              title="NIDC 2026 feedback form"
              loading="lazy"
              className="feedback-frame"
            >
              Loading…
            </iframe>

            <p className="sec-lead">
              Form not loading?{" "}
              <a href={FORM} target="_blank" rel="noopener noreferrer">
                Open it in a new tab
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
