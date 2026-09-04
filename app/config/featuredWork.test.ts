import { describe, expect, it } from "vitest";
import {
  featuredWork,
  formatProjectPeriod,
  formatProjectRole,
} from "./featuredWork";
import { skills } from "./skills";

describe("featuredWork config", () => {
  it("keeps the locked projects in most-recent-first order", () => {
    expect(featuredWork.map((project) => project.slug)).toEqual([
      "ai-debate-practice",
      "milktracker",
      "blossom-groconnect",
    ]);

    for (let index = 1; index < featuredWork.length; index += 1) {
      expect(featuredWork[index - 1].start).toBeGreaterThanOrEqual(
        featuredWork[index].start,
      );
    }
  });

  it("caps featured work at three without requiring a floor", () => {
    expect(featuredWork.length).toBeLessThanOrEqual(3);
  });

  it("keeps the locked project identity fields", () => {
    expect(
      featuredWork.map(({ slug, title, role, client, domain, start, end }) => ({
        slug,
        title,
        role,
        client,
        domain,
        start,
        end,
      })),
    ).toEqual([
      {
        slug: "ai-debate-practice",
        title: "AI debate practice platform",
        role: "Independent consultant",
        client: undefined,
        domain: "Education",
        start: 2026,
        end: "present",
      },
      {
        slug: "milktracker",
        title: "MilkTracker",
        role: "Lead front-end developer",
        client: "AngelEye Health",
        domain: "Healthcare",
        start: 2020,
        end: 2024,
      },
      {
        slug: "blossom-groconnect",
        title: "Blossom / GroConnect",
        role: "Lead mobile app developer",
        client: "Scotts Miracle-Gro",
        domain: "Consumer IoT",
        start: 2017,
        end: 2020,
      },
    ]);
  });

  it("uses structured dates and the shared derived period label", () => {
    for (const project of featuredWork) {
      expect(Number.isInteger(project.start)).toBe(true);
      expect(
        project.end === "present" || Number.isInteger(project.end),
      ).toBe(true);

      if (project.end !== "present") {
        expect(project.start).toBeLessThanOrEqual(project.end);
      }

      expect(formatProjectPeriod(project)).toBe(
        `${project.start}\u2013${project.end}`,
      );
    }

    expect(formatProjectPeriod({ start: 2026, end: "present" })).toBe(
      "2026\u2013present",
    );
  });

  it("joins an optional client to the project role", () => {
    expect(formatProjectRole({ role: "Independent consultant" })).toBe(
      "Independent consultant",
    );
    expect(
      formatProjectRole({
        role: "Lead front-end developer",
        client: "AngelEye Health",
      }),
    ).toBe("Lead front-end developer, AngelEye Health");
  });

  it("gives every project a non-empty blurb, domain, role, and unique slug", () => {
    for (const project of featuredWork) {
      expect(project.slug.trim()).not.toBe("");
      expect(project.blurb.trim()).not.toBe("");
      expect(project.role.trim()).not.toBe("");
      expect(project.domain.trim()).not.toBe("");
    }

    expect(new Set(featuredWork.map((project) => project.slug)).size).toBe(
      featuredWork.length,
    );
  });

  it("tags every project with non-empty catalogue slugs", () => {
    const catalogueSlugs = new Set(skills.map((skill) => skill.slug));

    for (const project of featuredWork) {
      expect(project.stack.length).toBeGreaterThan(0);

      for (const slug of project.stack) {
        expect(catalogueSlugs).toContain(slug);
      }
    }
  });

  it("gives every outcome a non-empty result and an optional figure", () => {
    for (const project of featuredWork) {
      for (const outcome of project.outcomes) {
        expect(outcome.result.trim()).not.toBe("");

        if (outcome.figure !== undefined) {
          expect(outcome.figure.trim()).not.toBe("");
        }
      }
    }
  });

  it("ships every project link-free", () => {
    for (const project of featuredWork) {
      expect(project.links ?? []).toEqual([]);
    }
  });
});
