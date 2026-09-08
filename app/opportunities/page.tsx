import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";
import RoleCard from "./RoleCard";
import { roles } from "./roles";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Volunteer roles on the team that organises NIDC, the Northern Ireland Developer Conference.",
  // unlisted for now — reachable by URL only
  robots: { index: false, follow: false },
};

export default function OpportunitiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section page-head">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> opportunities
            </p>
            <h1 className="sec-title">
              Help run <span className="hl">NIDC</span>.
            </h1>
            <p className="sec-body">
              NIDC is organised by practitioners and run by volunteers. Here&apos;s where we could
              use a hand.
            </p>
          </div>
        </section>

        <section className="section board-section">
          <div className="wrap page-wrap">
            <ul className="board">
              {roles.map((role) => (
                <li key={role.slug}>
                  <RoleCard role={role} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
