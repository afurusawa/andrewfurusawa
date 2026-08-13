import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { skills } from "../config/skills";
import {
  getPublishedNoteSlugs,
  getRenderedSkillNote,
  getSkillCatalogue,
  joinCatalogue,
  parseSkillNote,
  readSkillNotes,
  renderNoteHtml,
  type SkillNote,
} from "./skillCatalogue";

function note(slug: string, summary = `${slug} summary`): SkillNote {
  return { slug, summary, body: "" };
}

describe("skill catalogue join", () => {
  it("returns every catalogue skill in catalogue order", () => {
    expect(getSkillCatalogue().map((skill) => skill.slug)).toEqual(
      skills.map((skill) => skill.slug),
    );
  });

  it("marks a skill with a matching note file and carries that note's summary", () => {
    const joined = joinCatalogue(skills, [note("ionic", "Shared foundation.")]);
    const ionic = joined.find((skill) => skill.slug === "ionic");

    expect(ionic?.hasNote).toBe(true);
    expect(ionic?.summary).toBe("Shared foundation.");
  });

  it("leaves a skill without a note listed-only rather than erroring", () => {
    const joined = joinCatalogue(skills, [note("ionic")]);
    const html = joined.find((skill) => skill.slug === "html");

    expect(html?.hasNote).toBe(false);
    expect(html?.summary).toBeUndefined();
  });

  it("throws on a note whose slug is not in the catalogue", () => {
    expect(() => joinCatalogue(skills, [note("nextjs-typo")])).toThrow(
      /nextjs-typo/,
    );
  });

  it("publishes Ionic, the first shipping note", () => {
    expect(getPublishedNoteSlugs()).toContain("ionic");
    expect(
      getSkillCatalogue().find((skill) => skill.slug === "ionic")?.summary,
    ).toMatch(/^Ionic helped me deliver/);
  });

  it("keeps every note file on disk joinable to the catalogue", () => {
    expect(() => joinCatalogue(skills, readSkillNotes())).not.toThrow();
  });
});

describe("skill note parsing", () => {
  it("requires a summary", () => {
    expect(() => parseSkillNote("ionic", "## Where I used it\n")).toThrow(
      /summary/,
    );
  });

  it("reads the optional updated field only when present", () => {
    expect(parseSkillNote("ionic", "---\nsummary: S\n---\n").updated).toBeUndefined();
    expect(
      parseSkillNote("ionic", "---\nsummary: S\nupdated: 2026-08-13\n---\n")
        .updated,
    ).toBe("2026-08-13");
  });

  it("takes the slug from the filename, not from frontmatter", () => {
    const parsed = parseSkillNote("ionic", "---\nsummary: S\nskill: react\n---\nBody");

    expect(parsed.slug).toBe("ionic");
    expect(parsed.body.trim()).toBe("Body");
  });
});

describe("skill note rendering", () => {
  it("compiles standard Markdown to HTML", async () => {
    const html = await renderNoteHtml(
      "## Why it fit\n\nOne shared *model*, two stores.\n",
    );

    expect(html).toContain("<h2>Why it fit</h2>");
    expect(html).toContain("<em>model</em>");
  });

  it("strips raw HTML rather than rendering it", async () => {
    const html = await renderNoteHtml(
      'Text <script>alert(1)</script> <span onclick="x()">more</span>\n',
    );

    expect(html).not.toContain("<script>");
    expect(html).not.toContain("onclick");
  });

  it("renders the Ionic note with its three sections and no updated line", async () => {
    const rendered = await getRenderedSkillNote("ionic");

    expect(rendered?.name).toBe("Ionic");
    expect(rendered?.updated).toBeUndefined();
    expect(rendered?.html).toContain("<h2>Where I used it</h2>");
    expect(rendered?.html).toContain("<h2>Why it fit</h2>");
    expect(rendered?.html).toContain("<h2>What it taught me</h2>");
  });

  it("has no note for a listed-only skill", async () => {
    expect(await getRenderedSkillNote("html")).toBeUndefined();
    expect(await getRenderedSkillNote("not-a-skill")).toBeUndefined();
  });
});

describe("note pipeline dependencies", () => {
  it("ships the six locked packages and no MDX, GFM, or raw-HTML plugin", () => {
    const { dependencies } = JSON.parse(
      readFileSync(join(process.cwd(), "package.json"), "utf8"),
    ) as { dependencies: Record<string, string> };
    const installed = Object.keys(dependencies);

    expect(installed).toEqual(
      expect.arrayContaining([
        "gray-matter",
        "unified",
        "remark-parse",
        "remark-rehype",
        "rehype-sanitize",
        "rehype-stringify",
      ]),
    );
    expect(
      installed.filter((name) =>
        /^(@next\/mdx|@mdx-js\/|.*mdx|remark-gfm|rehype-raw|react-markdown)/.test(
          name,
        ),
      ),
    ).toEqual([]);
  });
});
