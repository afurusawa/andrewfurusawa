import { describe, expect, it } from "vitest";
import { filterSkillNames } from "./filterSkills";

const skills = ["React", "ReactiveX", "Angular", "Next.js"];

describe("filterSkillNames", () => {
  it("returns the full collection when the query is empty", () => {
    expect(filterSkillNames(skills, "")).toEqual(skills);
  });

  it("matches skills case-insensitively against the full collection", () => {
    expect(filterSkillNames(skills, "react")).toEqual(["React", "ReactiveX"]);
  });

  it("replacing one query with another searches the complete collection", () => {
    const afterReact = filterSkillNames(skills, "react");
    expect(afterReact).toEqual(["React", "ReactiveX"]);

    expect(filterSkillNames(skills, "angular")).toEqual(["Angular"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterSkillNames(skills, "cobol")).toEqual([]);
  });
});
