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

// The site is a static export, so there are no server redirects. A meta refresh
// sends visitors straight to the form; the link below covers anything that ignores it.
export default function FeedbackPage() {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${FORM}`} />
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
            <p className="sec-lead">Taking you to the feedback form…</p>
            <div className="btn-row">
              <a className="btn btn-primary" href={FORM}>
                Open the feedback form <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
