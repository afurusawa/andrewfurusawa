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

export type Skill = {
  name: string;
  icon: IconType;
};

/** Professional skills shown on both portfolio presentations. */
export const skills: readonly Skill[] = [
  { name: "HTML", icon: FaHtml5 },
  { name: "CSS", icon: FaCss3 },
  { name: "Sass", icon: SiSass },
  { name: "JavaScript", icon: FaJs },
  { name: "React", icon: FaReact },
  { name: "Typescript", icon: SiTypescript },
  { name: "Prettier", icon: SiPrettier },
  { name: "ESLint", icon: SiEslint },
  { name: "OAuth", icon: TbBrandOauth },
  { name: "Angular", icon: FaAngular },
  { name: "Ionic", icon: SiIonic },
  { name: "ReactiveX", icon: SiReactivex },
  { name: "Cordova", icon: SiApachecordova },
  { name: "Jasmine", icon: SiJasmine },
  { name: "Next.js", icon: RiNextjsFill },
  { name: "Nest.js", icon: SiNestjs },
  { name: "Vite", icon: SiVite },
  { name: "Webpack", icon: SiWebpack },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Redux", icon: SiRedux },
  { name: "TypeORM", icon: SiTypeorm },
  { name: "Fastify", icon: SiFastify },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Docker", icon: SiDocker },
  { name: "Shadcn", icon: SiShadcnui },
  { name: "Figma", icon: SiFigma },
  { name: "Sketch", icon: SiSketch },
  { name: "Apple Developer", icon: FaAppStoreIos },
  { name: "Google Play Console", icon: FaGooglePlay },
  { name: "Git", icon: FaGit },
  { name: "Bitrise", icon: SiBitrise },
  { name: "Jenkins", icon: SiJenkins },
  { name: "Marvel", icon: SiMarvelapp },
  { name: "jQuery", icon: SiJquery },
];
