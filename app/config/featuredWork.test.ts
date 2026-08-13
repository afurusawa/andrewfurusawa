import { describe, expect, it } from "vitest";
import { featuredWork } from "./featuredWork";
import { skills } from "./skills";

describe("featuredWork config", () => {
  it("shows the curated projects in order", () => {
    expect(
      featuredWork.map((project) => ({
        title: project.title,
        role: project.role,
        period: project.period,
      })),
    ).toEqual([
      {
        title: "MilkTracker",
        role: "Lead front-end developer, Angel Eye Health",
        period: "2020–2024",
      },
      {
        title: "Blossom / GroConnect",
        role: "Lead mobile app developer, Scotts Miracle-Gro",
        period: "2017–2020",
      },
      {
        title: "AI education platform",
        role: "Lead developer, freelance",
        period: "2025–present",
      },
    ]);
  });

  it("caps featured work at three without requiring a floor", () => {
    expect(featuredWork.length).toBeLessThanOrEqual(3);
  });

  it("tags every project with catalogue slugs", () => {
    const catalogueSlugs = new Set(skills.map((skill) => skill.slug));

    for (const project of featuredWork) {
      expect(project.stack.length).toBeGreaterThan(0);

      for (const slug of project.stack) {
        expect(catalogueSlugs).toContain(slug);
      }
    }
  });

  it("gives every project a blurb and a unique slug", () => {
    for (const project of featuredWork) {
      expect(project.slug.length).toBeGreaterThan(0);
      expect(project.blurb.length).toBeGreaterThan(0);
    }

    expect(new Set(featuredWork.map((project) => project.slug)).size).toBe(
      featuredWork.length,
    );
  });

  it("ships every project link-free", () => {
    for (const project of featuredWork) {
      expect(project.links ?? []).toEqual([]);
    }
  });
});
