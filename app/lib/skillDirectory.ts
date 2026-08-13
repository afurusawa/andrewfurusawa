import { CATEGORY_ORDER, type SkillCategory } from "../config/skills";
import { getSkillCatalogue, type CatalogueSkill } from "./skillCatalogue";

export type SkillDirectoryGroup = {
  category: SkillCategory;
  skills: readonly CatalogueSkill[];
  /** Skills in the group. */
  total: number;
  /** Of those, how many have a note. */
  noted: number;
};

/**
 * Group a catalogue into the directory shape: `CATEGORY_ORDER` outside,
 * catalogue order preserved within a group. Note presence arrives already
 * resolved from the join — the directory never re-derives it. Empty categories
 * are dropped rather than rendered as a bare heading.
 */
export function buildSkillDirectory(
  catalogue: readonly CatalogueSkill[],
): readonly SkillDirectoryGroup[] {
  return CATEGORY_ORDER.map((category) => {
    const groupSkills = catalogue.filter((skill) => skill.category === category);

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
  return buildSkillDirectory(getSkillCatalogue());
}

/** The heading count for a group: `<n> · <m> with notes`. */
export function groupCountLabel(group: SkillDirectoryGroup): string {
  return `${group.total} · ${group.noted} with notes`;
}

/** Where a skill's note lives. Only called for skills that have one. */
export function skillNoteHref(slug: string): string {
  return `/90s/skills/${slug}`;
}
