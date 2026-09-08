import type { Metadata } from "next";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";
import ArticleCard from "./ArticleCard";
import { articles } from "./articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Announcements and stories from the team behind NIDC, the Northern Ireland Developer Conference.",
  alternates: { canonical: "https://nidevconf.com/articles" },
};

export default function ArticlesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section page-head">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> articles
            </p>
            <h1 className="sec-title">
              News from the <span className="hl">team</span>.
            </h1>
            <p className="sec-body">
              Announcements, and the odd story from behind the scenes of NIDC.
            </p>
          </div>
        </section>

        <section className="section board-section">
          <div className="wrap page-wrap">
            <ul className="board">
              {articles.map((a) => (
                <li key={a.slug}>
                  <ArticleCard a={a} />
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
