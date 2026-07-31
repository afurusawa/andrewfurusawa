import { describe, expect, it } from "vitest";
import { filterSkills } from "./filterSkills";

const skills = [
  { name: "React" },
  { name: "ReactiveX" },
  { name: "Angular" },
  { name: "Next.js" },
];

describe("filterSkills", () => {
  it("returns the full collection when the query is empty", () => {
    expect(filterSkills(skills, "")).toEqual(skills);
  });

  it("matches skills case-insensitively against the full collection", () => {
    expect(filterSkills(skills, "react")).toEqual([
      { name: "React" },
      { name: "ReactiveX" },
    ]);
  });

  it("replacing one query with another searches the complete collection", () => {
    const afterReact = filterSkills(skills, "react");
    expect(afterReact).toEqual([{ name: "React" }, { name: "ReactiveX" }]);

    expect(filterSkills(skills, "angular")).toEqual([{ name: "Angular" }]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterSkills(skills, "cobol")).toEqual([]);
  });
});
