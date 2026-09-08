import { isValidElement, type ReactNode } from "react";
import communityInterestCompany from "./posts/community-interest-company";

export type Article = {
  /** the URL: /articles/<slug> — never change one once it is published */
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD), shown in house style via longDate() */
  date: string;
  author: string;
  /** the author's photo under /public, drawn as a small round face beside the name */
  avatar?: string;
  /** one-liner for the index card, <meta description> and link previews */
  summary?: string;
  /** the display-face line under the title */
  lead?: string;
  body: ReactNode;
};

/* newest first — a new article is a file in ./posts and a line here */
export const articles: Article[] = [communityInterestCompany];

/** "2026-09-04" → "Friday, 4th September 2026", the way dates read across the site */
export function longDate(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  const n = d.getUTCDate();
  const th = n % 100 >= 11 && n % 100 <= 13 ? "th" : (["th", "st", "nd", "rd"][n % 10] ?? "th");
  const part = (o: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" });
  return `${part({ weekday: "long" })}, ${n}${th} ${part({ month: "long" })} ${d.getUTCFullYear()}`;
}

/** words in a static JSX tree — plenty for a reading time */
function words(node: ReactNode): number {
  if (typeof node === "string") return node.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(node)) return node.reduce((n, c) => n + words(c), 0);
  if (isValidElement<{ children?: ReactNode }>(node)) return words(node.props.children);
  return 0;
}

/** minutes at a comfortable 220 words a minute, never less than one */
export const readMinutes = (a: Article) => Math.max(1, Math.round(words(a.body) / 220));
