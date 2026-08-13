import { describe, expect, it } from "vitest";
import { ninetiesHubMetadata, ninetiesMetadata } from "./metadata";

describe("/90s metadata", () => {
  it("discourages indexing from the experiment layout only", () => {
    expect(ninetiesMetadata.robots).toEqual({ index: false, follow: false });
    expect(ninetiesHubMetadata.robots).toBeUndefined();
  });

  it("keeps the hub canonical on the hub page, not the layout", () => {
    expect(ninetiesMetadata.alternates?.canonical).toBeUndefined();
    expect(ninetiesHubMetadata.alternates?.canonical).toBe("/90s");
  });

  it("sets an explicit experiment unfurl that does not inherit the public portfolio", () => {
    expect(ninetiesMetadata.title).toBe(
      "Andrew Furusawa · Neon Cyber Basement",
    );
    expect(ninetiesMetadata.description).toBe(
      "Nothing links here. You arrived by URL, which is the idea.",
    );
    expect(ninetiesMetadata.openGraph).toEqual({
      type: "website",
      title: "Andrew Furusawa · Neon Cyber Basement",
      description:
        "Nothing links here. You arrived by URL, which is the idea.",
      images: [],
    });
    expect(ninetiesMetadata.twitter).toEqual({
      card: "summary",
      title: "Andrew Furusawa · Neon Cyber Basement",
      description:
        "Nothing links here. You arrived by URL, which is the idea.",
      images: [],
    });
  });
});
