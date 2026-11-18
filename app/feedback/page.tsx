import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

const FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLScqrkyE0HrkqukqKx9s2JC3wk-H-UaBVPDobgP9c0AmWwtKmw/viewform";

const description = "Tell us what you thought of NIDC 2026.";

export const metadata: Metadata = {
  title: "Feedback",
  description,
  alternates: { canonical: "https://nidevconf.com/feedback" },
  openGraph: {
    title: "Feedback | NIDC 2026",
    description,
    url: "https://nidevconf.com/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> feedback
            </p>
            <h1 className="sec-title">
              Share your <span className="hl">feedback</span>.
            </h1>
            <p className="sec-lead">
              Tell us what you thought of NIDC 2026. It only takes a few minutes.
            </p>

            {/* Google Forms supports embedding via ?embedded=true */}
            <iframe
              src={`${FORM}?embedded=true`}
              title="NIDC 2026 feedback form"
              loading="lazy"
              style={{
                width: "100%",
                height: "max(80vh, 700px)",
                border: 0,
                marginTop: 24,
              }}
            >
              Loading…
            </iframe>

            <p className="sec-lead" style={{ marginTop: 16 }}>
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
