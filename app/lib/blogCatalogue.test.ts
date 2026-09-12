import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BLOG_TEASER_LIMIT,
  blogEntryHref,
  getPublishedBlogEntries,
  getPublishedBlogSlugs,
  getRenderedBlogEntry,
  parseBlogEntry,
  readBlogEntries,
} from "./blogCatalogue";

const SAMPLE = `---
title: Hello
date: 2026-09-11
summary: A teaser.
---

## Body

Some *words*.
`;

describe("blog entry parsing", () => {
  it("requires title, date, and summary", () => {
    expect(() => parseBlogEntry("hello", "---\ndate: 2026-09-11\nsummary: S\n---\n")).toThrow(
      /title/,
    );
    expect(() => parseBlogEntry("hello", "---\ntitle: Hello\nsummary: S\n---\n")).toThrow(
      /date/,
    );
    expect(() => parseBlogEntry("hello", "---\ntitle: Hello\ndate: 2026-09-11\n---\n")).toThrow(
      /summary/,
    );
  });

  it("takes the slug from the filename, not from frontmatter", () => {
    const parsed = parseBlogEntry("hello", SAMPLE);

    expect(parsed.slug).toBe("hello");
    expect(parsed.title).toBe("Hello");
    expect(parsed.date).toBe("2026-09-11");
    expect(parsed.summary).toBe("A teaser.");
    expect(parsed.draft).toBe(false);
    expect(parsed.body).toContain("## Body");
  });

  it("treats only an explicit draft: true as a draft", () => {
    expect(parseBlogEntry("hello", SAMPLE).draft).toBe(false);
    expect(
      parseBlogEntry(
        "hello",
        "---\ntitle: Hello\ndate: 2026-09-11\nsummary: S\ndraft: true\n---\n",
      ).draft,
    ).toBe(true);
    expect(
      parseBlogEntry(
        "hello",
        "---\ntitle: Hello\ndate: 2026-09-11\nsummary: S\ndraft: false\n---\n",
      ).draft,
    ).toBe(false);
  });

  it("keeps a YAML date as a calendar day", () => {
    expect(
      parseBlogEntry(
        "hello",
        "---\ntitle: Hello\ndate: 2026-09-11\nsummary: S\n---\n",
      ).date,
    ).toBe("2026-09-11");
  });
});

describe("blog directory", () => {
  it("returns an empty list when the directory is missing", () => {
    expect(readBlogEntries(join(tmpdir(), "no-blog-here"))).toEqual([]);
  });

  it("reads markdown files and ignores other extensions", () => {
    const directory = mkdtempSync(join(tmpdir(), "blog-"));
    writeFileSync(join(directory, "hello.md"), SAMPLE);
    writeFileSync(join(directory, "notes.txt"), "nope");

    const entries = readBlogEntries(directory);

    expect(entries.map((entry) => entry.slug)).toEqual(["hello"]);
  });
});

describe("published set", () => {
  it("omits drafts, newest first", () => {
    const directory = mkdtempSync(join(tmpdir(), "blog-"));
    writeFileSync(
      join(directory, "older.md"),
      "---\ntitle: Older\ndate: 2026-01-01\nsummary: A\n---\n",
    );
    writeFileSync(
      join(directory, "newer.md"),
      "---\ntitle: Newer\ndate: 2026-09-11\nsummary: B\n---\n",
    );
    writeFileSync(
      join(directory, "secret.md"),
      "---\ntitle: Secret\ndate: 2026-12-01\nsummary: C\ndraft: true\n---\n",
    );

    const published = readBlogEntries(directory)
      .filter((entry) => !entry.draft)
      .slice()
      .sort((left, right) => right.date.localeCompare(left.date));

    expect(published.map((entry) => entry.slug)).toEqual(["newer", "older"]);
  });

  it("points public hrefs at the modern presentation", () => {
    expect(blogEntryHref("hello")).toBe("/blog/hello");
  });

  it("caps hub teasers at three", () => {
    expect(BLOG_TEASER_LIMIT).toBe(3);
  });
});

describe("disk catalogue", () => {
  it("does not import Keystatic — the admin writes files, this module reads them", () => {
    const source = readFileSync(
      join(process.cwd(), "app/lib/blogCatalogue.ts"),
      "utf8",
    );

    expect(source).not.toMatch(/keystatic/i);
  });

  it("does not throw on the real content/blog directory", () => {
    expect(() => getPublishedBlogEntries()).not.toThrow();
    expect(getPublishedBlogSlugs()).toEqual(
      getPublishedBlogEntries().map((entry) => entry.slug),
    );
  });

  it("does not render a missing or drafted slug", async () => {
    expect(await getRenderedBlogEntry("not-a-post")).toBeUndefined();
  });
});
