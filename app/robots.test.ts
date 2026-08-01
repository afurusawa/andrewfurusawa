import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("discourages crawlers from indexing the /90s experiment", () => {
    const rules = robots().rules;

    expect(rules).toEqual({
      userAgent: "*",
      allow: "/",
      disallow: "/90s",
    });
  });
});
