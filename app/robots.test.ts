import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots", () => {
  it("does not name the /90s experiment", () => {
    const manifest = robots();

    expect(JSON.stringify(manifest)).not.toContain("/90s");
    expect(manifest.rules).toEqual({
      userAgent: "*",
      allow: "/",
    });
  });
});
