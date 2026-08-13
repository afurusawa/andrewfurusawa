import { describe, expect, it } from "vitest";
import {
  ninetiesHubMetadata,
  ninetiesMetadata,
  ninetiesNoteMetadata,
} from "./metadata";
import { getRenderedSkillNote } from "../lib/skillCatalogue";

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

describe("/90s skill note metadata", () => {
  it("gives a note its own self-referential canonical", () => {
    expect(
      ninetiesNoteMetadata({ slug: "ionic", name: "Ionic", summary: "S" })
        .alternates?.canonical,
    ).toBe("/90s/skills/ionic");
  });

  it("unfurls as '{name} · Andrew Furusawa' with the note's summary", async () => {
    const note = await getRenderedSkillNote("ionic");
    const metadata = ninetiesNoteMetadata(note!);

    expect(metadata.title).toBe("Ionic · Andrew Furusawa");
    expect(metadata.description).toBe(note!.summary);
    expect(metadata.openGraph).toEqual({
      type: "website",
      title: "Ionic · Andrew Furusawa",
      description: note!.summary,
      images: [],
    });
    expect(metadata.twitter).toEqual({
      card: "summary",
      title: "Ionic · Andrew Furusawa",
      description: note!.summary,
      images: [],
    });
  });

  it("exports no robots key of its own, so the layout's noindex survives the merge", () => {
    expect(
      ninetiesNoteMetadata({ slug: "ionic", name: "Ionic", summary: "S" })
        .robots,
    ).toBeUndefined();
  });
});
