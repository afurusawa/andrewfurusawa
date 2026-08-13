import { describe, expect, it } from "vitest";
import { CATEGORY_ORDER, skills } from "../config/skills";
import {
  buildSkillDirectory,
  getSkillDirectory,
  groupCountLabel,
  skillNoteHref,
} from "./skillDirectory";

describe("skill directory", () => {
  it("groups the catalogue in CATEGORY_ORDER", () => {
    expect(getSkillDirectory().map((group) => group.category)).toEqual([
      ...CATEGORY_ORDER,
    ]);
  });

  it("keeps catalogue order within a group and loses no skill", () => {
    const directory = getSkillDirectory();

    expect(directory.flatMap((group) => group.skills.map((s) => s.slug))).toEqual(
      [...CATEGORY_ORDER].flatMap((category) =>
        skills.filter((s) => s.category === category).map((s) => s.slug),
      ),
    );
    expect(directory.reduce((sum, group) => sum + group.total, 0)).toBe(
      skills.length,
    );
  });

  it("lists every skill without a note while the publish set is empty", () => {
    const directory = getSkillDirectory();

    expect(directory.every((group) => group.noted === 0)).toBe(true);
    expect(
      directory.every((group) => group.skills.every((s) => !s.hasNote)),
    ).toBe(true);
  });

  it("marks note presence from the publish set it is given", () => {
    const directory = buildSkillDirectory(skills, ["ionic"]);
    const mobile = directory.find((group) => group.category === "Mobile");

    expect(mobile?.noted).toBe(1);
    expect(mobile?.skills.find((s) => s.slug === "ionic")?.hasNote).toBe(true);
    expect(mobile?.skills.find((s) => s.slug === "cordova")?.hasNote).toBe(false);
  });

  it("drops a category with no skills rather than heading an empty group", () => {
    const directory = buildSkillDirectory(
      skills.filter((skill) => skill.category !== "Design"),
      [],
    );

    expect(directory.map((group) => group.category)).not.toContain("Design");
  });

  it("counts a group as '<n> · <m> with notes'", () => {
    const [frontend] = buildSkillDirectory(skills, ["react", "redux"]);

    expect(groupCountLabel(frontend)).toBe("13 · 2 with notes");
  });

  it("points a note at its slug under the experiment", () => {
    expect(skillNoteHref("ionic")).toBe("/90s/skills/ionic");
  });
});
