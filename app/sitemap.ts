import type { MetadataRoute } from "next";
import { articles } from "./articles/articles";
import sessions from "./_data/sessions.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nidevconf.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/my-agenda`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/volunteers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(articles[0].date),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...articles.map((a) => ({
      url: `${baseUrl}/articles/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...sessions.map((s) => ({
      url: `${baseUrl}/sessions/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
