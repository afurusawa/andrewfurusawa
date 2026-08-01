import { describe, expect, it } from "vitest";
import { ninetiesMetadata } from "./metadata";

describe("/90s metadata", () => {
  it("uses a route-specific canonical URL and discourages indexing", () => {
    expect(ninetiesMetadata.alternates?.canonical).toBe("/90s");
    expect(ninetiesMetadata.robots).toEqual({ index: false, follow: false });
  });
});
