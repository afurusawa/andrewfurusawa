import { describe, expect, it } from "vitest";
import { getPublishedBlogEntries } from "./lib/blogCatalogue";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("always lists the public origin and never names /90s", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls[0]).toBe("https://andrewfurusawa.dev");
    expect(urls.join("\n")).not.toContain("/90s");
  });

  it("adds writing routes only when a post is published", () => {
    const urls = sitemap().map((entry) => entry.url);
    const published = getPublishedBlogEntries();

    if (published.length === 0) {
      expect(urls).toEqual(["https://andrewfurusawa.dev"]);
      return;
    }

    expect(urls).toContain("https://andrewfurusawa.dev/blog");
    for (const entry of published) {
      expect(urls).toContain(`https://andrewfurusawa.dev/blog/${entry.slug}`);
    }
  });
});
