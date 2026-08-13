import { describe, expect, it } from "vitest";
import { CATEGORY_ORDER, skills } from "./skills";

describe("skills config", () => {
  it("contains the complete professional skills catalogue in display order", () => {
    expect(
      skills.map((skill) => ({
        name: skill.name,
        slug: skill.slug,
        category: skill.category,
      })),
    ).toEqual([
      { name: "HTML", slug: "html", category: "Frontend" },
      { name: "CSS", slug: "css", category: "Frontend" },
      { name: "Sass", slug: "sass", category: "Frontend" },
      { name: "JavaScript", slug: "javascript", category: "Frontend" },
      { name: "React", slug: "react", category: "Frontend" },
      { name: "Typescript", slug: "typescript", category: "Frontend" },
      { name: "Prettier", slug: "prettier", category: "Tooling" },
      { name: "ESLint", slug: "eslint", category: "Tooling" },
      { name: "OAuth", slug: "oauth", category: "Backend" },
      { name: "Angular", slug: "angular", category: "Frontend" },
      { name: "Ionic", slug: "ionic", category: "Mobile" },
      { name: "ReactiveX", slug: "rxjs", category: "Frontend" },
      { name: "Cordova", slug: "cordova", category: "Mobile" },
      { name: "Jasmine", slug: "jasmine", category: "Tooling" },
      { name: "Next.js", slug: "nextjs", category: "Frontend" },
      { name: "Nest.js", slug: "nestjs", category: "Backend" },
      { name: "Vite", slug: "vite", category: "Tooling" },
      { name: "Webpack", slug: "webpack", category: "Tooling" },
      { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend" },
      { name: "Redux", slug: "redux", category: "Frontend" },
      { name: "TypeORM", slug: "typeorm", category: "Backend" },
      { name: "Fastify", slug: "fastify", category: "Backend" },
      { name: "PostgreSQL", slug: "postgresql", category: "Backend" },
      { name: "MongoDB", slug: "mongodb", category: "Backend" },
      { name: "Docker", slug: "docker", category: "Tooling" },
      { name: "Shadcn", slug: "shadcn", category: "Frontend" },
      { name: "Figma", slug: "figma", category: "Design" },
      { name: "Sketch", slug: "sketch", category: "Design" },
      { name: "Apple Developer", slug: "apple-developer", category: "Mobile" },
      {
        name: "Google Play Console",
        slug: "google-play-console",
        category: "Mobile",
      },
      { name: "Git", slug: "git", category: "Tooling" },
      { name: "Bitrise", slug: "bitrise", category: "Tooling" },
      { name: "Jenkins", slug: "jenkins", category: "Tooling" },
      { name: "Marvel", slug: "marvel", category: "Design" },
      { name: "jQuery", slug: "jquery", category: "Frontend" },
    ]);
  });

  it("gives every category at least two skills", () => {
    for (const category of CATEGORY_ORDER) {
      expect(
        skills.filter((skill) => skill.category === category).length,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});
