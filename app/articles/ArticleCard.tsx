import Link from "next/link";
import { longDate, readMinutes, type Article } from "./articles";

/* one board card per article: the index and an article's "read next" share it */
export default function ArticleCard({ a }: { a: Article }) {
  return (
    <Link href={`/articles/${a.slug}`} className="board-card">
      <h2 className="board-title">{a.title}</h2>
      <p className="facts">
        <span>{longDate(a.date)}</span>
        <span>{a.author}</span>
        <span>{readMinutes(a)} min read</span>
      </p>
      {a.summary && <p className="board-summary">{a.summary}</p>}
      <span className="board-cta">
        Read on <span className="arrow">→</span>
      </span>
    </Link>
  );
}
