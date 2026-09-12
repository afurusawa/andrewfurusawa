import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { frontmatterString, renderMarkdownHtml } from "./markdown";

/** Where blog entries live. The filename is the slug. */
export const BLOG_DIRECTORY = join(process.cwd(), "content", "blog");

export function blogEntryHref(slug: string): string {
  return `/blog/${slug}`;
}

/** How many entries the two hubs tease. The /blog index lists the rest. */
export const BLOG_TEASER_LIMIT = 3;

/** A blog file, parsed but not yet rendered. */
export type BlogEntry = {
  /** Taken from the filename, never from frontmatter. */
  slug: string;
  title: string;
  date: string;
  summary: string;
  draft: boolean;
  /** Markdown body with the frontmatter stripped. */
  body: string;
};

/** An entry ready to render: identity plus sanitized HTML. */
export type RenderedBlogEntry = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  html: string;
};

function frontmatterDraft(value: unknown): boolean {
  return value === true;
}

/**
 * Parse one blog file. `title`, `date`, and `summary` are required so a listing
 * card and a meta description can exist. `draft: true` keeps the file off
 * listings, sitemap, RSS, and `generateStaticParams`.
 */
export function parseBlogEntry(slug: string, source: string): BlogEntry {
  const { data, content } = matter(source);
  const title = frontmatterString(data.title);
  const date = frontmatterString(data.date);
  const summary = frontmatterString(data.summary);

  if (!title) {
    throw new Error(
      `Blog entry "${slug}" is missing a title. Frontmatter requires title.`,
    );
  }

  if (!date) {
    throw new Error(
      `Blog entry "${slug}" is missing a date. Frontmatter requires date.`,
    );
  }

  if (!summary) {
    throw new Error(
      `Blog entry "${slug}" is missing a summary. Frontmatter requires summary.`,
    );
  }

  return {
    slug,
    title,
    date,
    summary,
    draft: frontmatterDraft(data.draft),
    body: content,
  };
}

/** Read every blog file. An empty or absent directory is the normal case. */
export function readBlogEntries(directory = BLOG_DIRECTORY): BlogEntry[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) =>
      parseBlogEntry(
        entry.slice(0, -".md".length),
        readFileSync(join(directory, entry), "utf8"),
      ),
    );
}

function byDateDescending(left: BlogEntry, right: BlogEntry): number {
  return right.date.localeCompare(left.date) || left.slug.localeCompare(right.slug);
}

let cachedEntries: readonly BlogEntry[] | undefined;

/** The entries on disk, read once per build rather than once per route. */
function entries(): readonly BlogEntry[] {
  cachedEntries ??= readBlogEntries();

  return cachedEntries;
}

/** Published entries, newest first. Drafts never appear here. */
export function getPublishedBlogEntries(): readonly BlogEntry[] {
  return entries()
    .filter((entry) => !entry.draft)
    .slice()
    .sort(byDateDescending);
}

/** Newest published entries for the two hub teasers. */
export function getBlogTeasers(): readonly BlogEntry[] {
  return getPublishedBlogEntries().slice(0, BLOG_TEASER_LIMIT);
}

/** Slugs a public blog route may be generated for. */
export function getPublishedBlogSlugs(): string[] {
  return getPublishedBlogEntries().map((entry) => entry.slug);
}

/**
 * An entry ready for its public route, or `undefined` when the slug is a
 * draft or does not exist.
 */
export async function getRenderedBlogEntry(
  slug: string,
): Promise<RenderedBlogEntry | undefined> {
  const entry = entries().find((item) => item.slug === slug);

  if (!entry || entry.draft) {
    return undefined;
  }

  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    summary: entry.summary,
    html: await renderMarkdownHtml(entry.body),
  };
}
