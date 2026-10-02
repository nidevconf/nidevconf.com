import type { Metadata } from "next";
import { TIMETABLE } from "../_components/Schedule";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";
import MyAgenda from "./MyAgenda";

const description =
  "Heart the sessions you want to see at NIDC 2026 and get your own timetable for the day. No account needed.";

export const metadata: Metadata = {
  title: "My agenda",
  description,
  alternates: { canonical: "https://nidevconf.com/my-agenda" },
};

export default function MyAgendaPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> my agenda
            </p>
            <h1 className="sec-title">
              Your <span className="hl">NIDC</span>.
            </h1>
            <p className="sec-lead">
              Heart the sessions you want to see and your day comes together here.
            </p>
            {/* the timetable is worked out at build, the picks only exist in the browser */}
            <MyAgenda timetable={TIMETABLE} />
            <p className="my-privacy">
              Your picks are kept on this device. We count them anonymously to plan room sizes.
              No account, and no personal data.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
