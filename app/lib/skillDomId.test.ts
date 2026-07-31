import { describe, expect, it } from "vitest";
import { skillDomId } from "./skillDomId";

describe("skillDomId", () => {
  it("builds a stable DOM id from a skill name", () => {
    expect(skillDomId("Next.js")).toBe("skill-next-js");
    expect(skillDomId("Tailwind CSS")).toBe("skill-tailwind-css");
    expect(skillDomId("HTML")).toBe("skill-html");
  });
});
