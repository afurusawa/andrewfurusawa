/**
 * PROTOTYPE stub — the 35-skill catalogue with the slugs locked in #42, joined to a
 * plausible sparse publish set. Not production; the real join is getSkillCatalogue().
 *
 * `category` is present ONLY so variant B can test whether grouping earns the field
 * that #42 deliberately deferred. It is not a decided part of the model.
 */

import type { IconType } from "react-icons";
import { skills } from "../../config/skills";

/** Real brand marks, keyed by the display names already in app/config/skills.ts. */
const ICON_BY_NAME = new Map<string, IconType>(
  skills.map((s) => [s.name, s.icon]),
);

export const iconFor = (name: string): IconType | undefined =>
  ICON_BY_NAME.get(name);

export type StubSkill = {
  slug: string;
  name: string;
  category: string;
  /** Frontmatter summary — present exactly when a note exists (the publish set). */
  summary?: string;
  updated?: string;
};

export const CATALOGUE: StubSkill[] = [
  { slug: "html", name: "HTML", category: "Frontend" },
  { slug: "css", name: "CSS", category: "Frontend" },
  { slug: "sass", name: "Sass", category: "Frontend" },
  { slug: "javascript", name: "JavaScript", category: "Frontend" },
  { slug: "react", name: "React", category: "Frontend" },
  { slug: "typescript", name: "Typescript", category: "Frontend" },
  { slug: "prettier", name: "Prettier", category: "Tooling" },
  { slug: "eslint", name: "ESLint", category: "Tooling" },
  { slug: "oauth", name: "OAuth", category: "Backend" },
  {
    slug: "angular",
    name: "Angular",
    category: "Frontend",
    summary:
      "Four years of it, at the scale where its opinions stop being overhead and start being the reason the team ships.",
    updated: "2026-08-01",
  },
  {
    slug: "ionic",
    name: "Ionic",
    category: "Mobile",
    summary:
      "One codebase, three stores, ten hospitals. The compromise that made a two-person front end viable.",
    updated: "2026-07-28",
  },
  {
    slug: "rxjs",
    name: "ReactiveX",
    category: "Frontend",
    summary:
      "The hardest thing on this list to learn and the one that most changed how I think about state.",
  },
  {
    slug: "cordova",
    name: "Cordova",
    category: "Mobile",
    summary:
      "Superseded, not wrong. It answered a question the platforms had not answered yet.",
  },
  { slug: "jasmine", name: "Jasmine", category: "Testing" },
  {
    slug: "nextjs",
    name: "Next.js",
    category: "Frontend",
    summary:
      "What I reach for now, including for this site — and the first framework where the server felt like the default again.",
    updated: "2026-08-05",
  },
  { slug: "nestjs", name: "Nest.js", category: "Backend" },
  { slug: "vite", name: "Vite", category: "Tooling" },
  {
    slug: "webpack",
    name: "Webpack",
    category: "Tooling",
    summary: "For a while, this was simply what bundling was.",
  },
  { slug: "tailwindcss", name: "Tailwind CSS", category: "Frontend" },
  { slug: "redux", name: "Redux", category: "Frontend" },
  { slug: "typeorm", name: "TypeORM", category: "Backend" },
  { slug: "fastify", name: "Fastify", category: "Backend" },
  { slug: "postgresql", name: "PostgreSQL", category: "Backend" },
  { slug: "mongodb", name: "MongoDB", category: "Backend" },
  { slug: "docker", name: "Docker", category: "Tooling" },
  { slug: "shadcn", name: "Shadcn", category: "Design" },
  { slug: "figma", name: "Figma", category: "Design" },
  { slug: "sketch", name: "Sketch", category: "Design" },
  { slug: "apple-developer", name: "Apple Developer", category: "Mobile" },
  { slug: "google-play-console", name: "Google Play Console", category: "Mobile" },
  { slug: "git", name: "Git", category: "Tooling" },
  { slug: "bitrise", name: "Bitrise", category: "Tooling" },
  { slug: "jenkins", name: "Jenkins", category: "Tooling" },
  { slug: "marvel", name: "Marvel", category: "Design" },
  {
    slug: "jquery",
    name: "jQuery",
    category: "Frontend",
    summary:
      "Fifty sites, cross-browser, before the platform caught up. It taught me what a shim is for.",
  },
];

export const hasNote = (s: StubSkill) => Boolean(s.summary);
export const PUBLISH_SET = CATALOGUE.filter(hasNote);

/** Catalogue order is authored, not alphabetical — mirrors app/config/skills.ts. */
export const CATEGORY_ORDER = [
  "Frontend",
  "Mobile",
  "Backend",
  "Testing",
  "Tooling",
  "Design",
];
