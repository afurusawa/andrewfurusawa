import type { Metadata } from "next";
import type { RenderedSkillNote } from "../lib/skillCatalogue";

const unfurlTitle = "Andrew Furusawa · Neon Cyber Basement";
const unfurlDescription =
  "Nothing links here. You arrived by URL, which is the idea.";

/** Layout metadata: robots and unfurl. Canonical lives on the hub page. */
export const ninetiesMetadata: Metadata = {
  title: unfurlTitle,
  description: unfurlDescription,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    title: unfurlTitle,
    description: unfurlDescription,
    images: [],
  },
  twitter: {
    card: "summary",
    title: unfurlTitle,
    description: unfurlDescription,
    images: [],
  },
};

/** Hub-page metadata so descendants do not inherit the hub canonical. */
export const ninetiesHubMetadata: Metadata = {
  alternates: {
    canonical: "/90s",
  },
};

/**
 * Skill-note metadata: its own self-referential canonical and an unfurl built
 * from the catalogue name plus the note's summary. No `robots` key — metadata
 * merges shallowly, so one here would drop the layout's `noindex` and leave the
 * response header carrying the policy alone.
 */
export function ninetiesNoteMetadata(
  note: Pick<RenderedSkillNote, "slug" | "name" | "summary">,
): Metadata {
  const title = `${note.name} · Andrew Furusawa`;

  return {
    title,
    description: note.summary,
    alternates: {
      canonical: `/90s/skills/${note.slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description: note.summary,
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description: note.summary,
      images: [],
    },
  };
}
