/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../_components/SiteFooter";
import SiteHeader from "../../_components/SiteHeader";
import ArticleCard from "../ArticleCard";
import Share from "../Share";
import { articles, longDate, readMinutes } from "../articles";

type Params = { params: Promise<{ slug: string }> };

// static export: every article is prerendered, anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  const url = `https://nidevconf.com/articles/${a.slug}`;
  return {
    title: a.title,
    description: a.summary,
    alternates: { canonical: url },
    // openGraph does not merge with the layout's, so the image comes along again
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      url,
      publishedTime: a.date,
      authors: [a.author],
      images: ["/opengraph-image.jpg"],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.summary },
  };
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const url = `https://nidevconf.com/articles/${a.slug}`;
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      {/* fills across the top as you read — CSS only, see .read-progress */}
      <div className="read-progress" aria-hidden />
      <SiteHeader />
      <main id="main-content">
        <article className="section post">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <Link href="/articles">
                <span className="prompt">{"<"}</span> All articles
              </Link>
            </p>
            <h1 className="sec-title">{a.title}</h1>
            <p className="byline">
              {a.avatar && <img src={a.avatar} alt="" width={28} height={28} />}
              <span className="byline-who">{a.author}</span>
              <span className="byline-when">
                <time dateTime={a.date}>{longDate(a.date)}</time> · {readMinutes(a)} min read
              </span>
            </p>
            {a.lead && <p className="sec-lead">{a.lead}</p>}
            <div className="prose">{a.body}</div>

            <footer className="article-end">
              <p className="facts">Pass it on</p>
              <Share url={url} />
              {more.length > 0 && (
                <>
                  <h2 className="sec-title">Read next</h2>
                  <ul className="board">
                    {more.map((x) => (
                      <li key={x.slug}>
                        <ArticleCard a={x} />
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </footer>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
