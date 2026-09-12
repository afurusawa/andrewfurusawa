import type { MetadataRoute } from "next";
import { blogEntryHref, getPublishedBlogEntries } from "./lib/blogCatalogue";
import { absoluteUrl } from "./config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const published = getPublishedBlogEntries();
  const origin = {
    url: absoluteUrl(),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  if (published.length === 0) {
    return [origin];
  }

  return [
    origin,
    {
      url: absoluteUrl("/blog"),
      lastModified: published[0]?.date,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...published.map((entry) => ({
      url: absoluteUrl(blogEntryHref(entry.slug)),
      lastModified: entry.date,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
