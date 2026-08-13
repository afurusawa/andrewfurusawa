import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { skills, type Skill } from "../config/skills";

/** Where skill notes live. The filename is the only skill association. */
export const NOTES_DIRECTORY = join(process.cwd(), "content", "skills");

/** A note file, parsed but not yet rendered. */
export type SkillNote = {
  /** Taken from the filename, never from frontmatter. */
  slug: string;
  summary: string;
  updated?: string;
  /** Markdown body with the frontmatter stripped. */
  body: string;
};

/**
 * A catalogue skill plus the publish-set answer. `summary` is the note's own
 * teaser and is present exactly when `hasNote` is true.
 */
export type CatalogueSkill = Skill & {
  hasNote: boolean;
  summary?: string;
};

/** A note ready to render: catalogue identity plus sanitized HTML. */
export type RenderedSkillNote = {
  slug: string;
  name: string;
  summary: string;
  updated?: string;
  html: string;
};

function frontmatterString(value: unknown): string | undefined {
  // YAML turns a bare date into a Date; keep the day, drop the clock.
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

/**
 * Parse one note file. `summary` is required — it is both the directory teaser
 * and the note's meta description, so a note without one cannot ship.
 */
export function parseSkillNote(slug: string, source: string): SkillNote {
  const { data, content } = matter(source);
  const summary = frontmatterString(data.summary);

  if (!summary) {
    throw new Error(
      `Skill note "${slug}" is missing a summary. Frontmatter requires summary.`,
    );
  }

  return {
    slug,
    summary,
    updated: frontmatterString(data.updated),
    body: content,
  };
}

/** Read every note file. An empty or absent directory is the normal case. */
export function readSkillNotes(directory = NOTES_DIRECTORY): SkillNote[] {
  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((entry) => entry.endsWith(".md"))
    .map((entry) =>
      parseSkillNote(
        entry.slice(0, -".md".length),
        readFileSync(join(directory, entry), "utf8"),
      ),
    );
}

/**
 * The join: catalogue skills augmented with note presence and summary.
 *
 * An orphan note — a file whose slug names no catalogue skill — throws here
 * rather than shipping as a hub link to a 404. This runs at build time, so the
 * throw gates `next build`.
 */
export function joinCatalogue(
  catalogue: readonly Skill[],
  notes: readonly SkillNote[],
): readonly CatalogueSkill[] {
  const bySlug = new Map(notes.map((note) => [note.slug, note]));
  const known = new Set(catalogue.map((skill) => skill.slug));
  const orphans = notes
    .map((note) => note.slug)
    .filter((slug) => !known.has(slug));

  if (orphans.length > 0) {
    throw new Error(
      `Skill note${orphans.length > 1 ? "s" : ""} with no catalogue skill: ${orphans.join(", ")}. ` +
        "Rename the file in content/skills/ to a catalogue slug, or add the skill.",
    );
  }

  return catalogue.map((skill) => {
    const note = bySlug.get(skill.slug);

    return note
      ? { ...skill, hasNote: true, summary: note.summary }
      : { ...skill, hasNote: false };
  });
}

let cachedNotes: readonly SkillNote[] | undefined;
let cachedCatalogue: readonly CatalogueSkill[] | undefined;

/** The notes on disk, read once per build rather than once per route. */
function notes(): readonly SkillNote[] {
  cachedNotes ??= readSkillNotes();

  return cachedNotes;
}

/**
 * The one join. Hub tiles, featured-work stack tags, and the note routes all
 * read this shape; nothing else decides whether a skill has a note.
 */
export function getSkillCatalogue(): readonly CatalogueSkill[] {
  cachedCatalogue ??= joinCatalogue(skills, notes());

  return cachedCatalogue;
}

/** The publish set: slugs a note route may be generated for. */
export function getPublishedNoteSlugs(): string[] {
  return getSkillCatalogue()
    .filter((skill) => skill.hasNote)
    .map((skill) => skill.slug);
}

/**
 * Compile note Markdown to sanitized HTML. Standard Markdown only — no GFM and
 * no raw HTML, which the default sanitize schema strips on the way through.
 */
export async function renderNoteHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

/**
 * A note ready for its route, or `undefined` when the slug has no note. The
 * name comes from the catalogue, never from the note file.
 */
export async function getRenderedSkillNote(
  slug: string,
): Promise<RenderedSkillNote | undefined> {
  const skill = getSkillCatalogue().find((entry) => entry.slug === slug);

  if (!skill?.hasNote) {
    return undefined;
  }

  const note = notes().find((entry) => entry.slug === slug);

  if (!note) {
    return undefined;
  }

  return {
    slug,
    name: skill.name,
    summary: note.summary,
    updated: note.updated,
    html: await renderNoteHtml(note.body),
  };
}
