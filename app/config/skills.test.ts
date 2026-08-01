import { describe, expect, it } from "vitest";
import { skills } from "./skills";

describe("skills config", () => {
  it("contains the complete professional skills catalogue in display order", () => {
    expect(skills.map((skill) => skill.name)).toEqual([
      "HTML",
      "CSS",
      "Sass",
      "JavaScript",
      "React",
      "Typescript",
      "Prettier",
      "ESLint",
      "OAuth",
      "Angular",
      "Ionic",
      "ReactiveX",
      "Cordova",
      "Jasmine",
      "Next.js",
      "Nest.js",
      "Vite",
      "Webpack",
      "Tailwind CSS",
      "Redux",
      "TypeORM",
      "Fastify",
      "PostgreSQL",
      "MongoDB",
      "Docker",
      "Shadcn",
      "Figma",
      "Sketch",
      "Apple Developer",
      "Google Play Console",
      "Git",
      "Bitrise",
      "Jenkins",
      "Marvel",
      "jQuery",
    ]);
  });
});
