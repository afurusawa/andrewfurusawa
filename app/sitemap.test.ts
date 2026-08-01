import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("omits the /90s experiment", () => {
    expect(sitemap().map((entry) => entry.url)).not.toContain(
      "https://andrewfurusawa.dev/90s",
    );
  });
});
