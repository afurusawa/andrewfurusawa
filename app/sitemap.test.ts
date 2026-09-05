import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists only the public origin", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      "https://andrewfurusawa.dev",
    ]);
  });
});
