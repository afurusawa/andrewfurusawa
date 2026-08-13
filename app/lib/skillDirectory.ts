import {
  CATEGORY_ORDER,
  skills,
  type Skill,
  type SkillCategory,
} from "../config/skills";

/** A catalogue skill plus whether a skill note has been published for it. */
export type DirectorySkill = Skill & { hasNote: boolean };

export type SkillDirectoryGroup = {
  category: SkillCategory;
  skills: readonly DirectorySkill[];
  /** Skills in the group. */
  total: number;
  /** Of those, how many have a note. */
  noted: number;
};

/**
 * Slugs of the skills with a published note — the publish set. Empty until the
 * first note ships, which is why every tile is listed-only today. When notes
 * arrive this constant is replaced by the build-time join over the note files;
 * nothing downstream re-derives note presence.
 */
const PUBLISHED_NOTE_SLUGS: readonly string[] = [];

/**
 * Group a catalogue into the directory shape: `CATEGORY_ORDER` outside,
 * catalogue order preserved within a group, note presence resolved once.
 * Empty categories are dropped rather than rendered as a bare heading.
 */
export function buildSkillDirectory(
  catalogue: readonly Skill[],
  noteSlugs: Iterable<string>,
): readonly SkillDirectoryGroup[] {
  const noted = new Set(noteSlugs);

  return CATEGORY_ORDER.map((category) => {
    const groupSkills = catalogue
      .filter((skill) => skill.category === category)
      .map((skill) => ({ ...skill, hasNote: noted.has(skill.slug) }));

    return {
      category,
      skills: groupSkills,
      total: groupSkills.length,
      noted: groupSkills.filter((skill) => skill.hasNote).length,
    };
  }).filter((group) => group.total > 0);
}

/** The `/90s` skills directory: the shared catalogue in directory shape. */
export function getSkillDirectory(): readonly SkillDirectoryGroup[] {
  return buildSkillDirectory(skills, PUBLISHED_NOTE_SLUGS);
}

/** The heading count for a group: `<n> · <m> with notes`. */
export function groupCountLabel(group: SkillDirectoryGroup): string {
  return `${group.total} · ${group.noted} with notes`;
}

/** Where a skill's note lives. Only called for skills that have one. */
export function skillNoteHref(slug: string): string {
  return `/90s/skills/${slug}`;
}
