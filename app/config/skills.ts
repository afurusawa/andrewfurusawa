import type { IconType } from "react-icons";
import {
  FaAngular,
  FaReact,
  FaHtml5,
  FaCss3,
  FaJs,
  FaAppStoreIos,
  FaGooglePlay,
  FaGit,
} from "react-icons/fa";
import {
  SiNestjs,
  SiTypescript,
  SiIonic,
  SiTailwindcss,
  SiRedux,
  SiFastify,
  SiMongodb,
  SiPostgresql,
  SiPrettier,
  SiEslint,
  SiSass,
  SiVite,
  SiWebpack,
  SiDocker,
  SiShadcnui,
  SiFigma,
  SiSketch,
  SiJenkins,
  SiBitrise,
  SiMarvelapp,
  SiApachecordova,
  SiJasmine,
  SiJquery,
  SiTypeorm,
  SiReactivex,
} from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { TbBrandOauth } from "react-icons/tb";

export const CATEGORY_ORDER = [
  "Frontend",
  "Mobile",
  "Backend",
  "Tooling",
  "Design",
] as const;

export type SkillCategory = (typeof CATEGORY_ORDER)[number];

export type Skill = {
  slug: string;
  name: string;
  icon: IconType;
  category: SkillCategory;
};

/** Professional skills shown on both portfolio presentations. */
export const skills: readonly Skill[] = [
  { slug: "html", name: "HTML", icon: FaHtml5, category: "Frontend" },
  { slug: "css", name: "CSS", icon: FaCss3, category: "Frontend" },
  { slug: "sass", name: "Sass", icon: SiSass, category: "Frontend" },
  {
    slug: "javascript",
    name: "JavaScript",
    icon: FaJs,
    category: "Frontend",
  },
  { slug: "react", name: "React", icon: FaReact, category: "Frontend" },
  {
    slug: "typescript",
    name: "Typescript",
    icon: SiTypescript,
    category: "Frontend",
  },
  { slug: "prettier", name: "Prettier", icon: SiPrettier, category: "Tooling" },
  { slug: "eslint", name: "ESLint", icon: SiEslint, category: "Tooling" },
  { slug: "oauth", name: "OAuth", icon: TbBrandOauth, category: "Backend" },
  { slug: "angular", name: "Angular", icon: FaAngular, category: "Frontend" },
  { slug: "ionic", name: "Ionic", icon: SiIonic, category: "Mobile" },
  { slug: "rxjs", name: "ReactiveX", icon: SiReactivex, category: "Frontend" },
  { slug: "cordova", name: "Cordova", icon: SiApachecordova, category: "Mobile" },
  { slug: "jasmine", name: "Jasmine", icon: SiJasmine, category: "Tooling" },
  { slug: "nextjs", name: "Next.js", icon: RiNextjsFill, category: "Frontend" },
  { slug: "nestjs", name: "Nest.js", icon: SiNestjs, category: "Backend" },
  { slug: "vite", name: "Vite", icon: SiVite, category: "Tooling" },
  { slug: "webpack", name: "Webpack", icon: SiWebpack, category: "Tooling" },
  {
    slug: "tailwindcss",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "Frontend",
  },
  { slug: "redux", name: "Redux", icon: SiRedux, category: "Frontend" },
  { slug: "typeorm", name: "TypeORM", icon: SiTypeorm, category: "Backend" },
  { slug: "fastify", name: "Fastify", icon: SiFastify, category: "Backend" },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "Backend",
  },
  { slug: "mongodb", name: "MongoDB", icon: SiMongodb, category: "Backend" },
  { slug: "docker", name: "Docker", icon: SiDocker, category: "Tooling" },
  { slug: "shadcn", name: "Shadcn", icon: SiShadcnui, category: "Frontend" },
  { slug: "figma", name: "Figma", icon: SiFigma, category: "Design" },
  { slug: "sketch", name: "Sketch", icon: SiSketch, category: "Design" },
  {
    slug: "apple-developer",
    name: "Apple Developer",
    icon: FaAppStoreIos,
    category: "Mobile",
  },
  {
    slug: "google-play-console",
    name: "Google Play Console",
    icon: FaGooglePlay,
    category: "Mobile",
  },
  { slug: "git", name: "Git", icon: FaGit, category: "Tooling" },
  { slug: "bitrise", name: "Bitrise", icon: SiBitrise, category: "Tooling" },
  { slug: "jenkins", name: "Jenkins", icon: SiJenkins, category: "Tooling" },
  { slug: "marvel", name: "Marvel", icon: SiMarvelapp, category: "Design" },
  { slug: "jquery", name: "jQuery", icon: SiJquery, category: "Frontend" },
];
