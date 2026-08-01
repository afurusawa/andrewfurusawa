import { describe, expect, it } from "vitest";
import { metadata } from "./layout";

describe("/90s metadata", () => {
  it("uses a route-specific canonical URL and discourages indexing", () => {
    expect(metadata.alternates?.canonical).toBe("/90s");
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
