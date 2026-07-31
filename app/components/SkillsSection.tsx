'use client';

import React, { useMemo, useState } from 'react';
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
import { TbBrandOauth } from 'react-icons/tb';
import { filterSkills } from '../lib/filterSkills';

const allSkills = [
  {
    name: 'HTML',
    icon: <FaHtml5 />
  },
  {
    name: 'CSS',
    icon: <FaCss3 />
  },
  {
    name: 'Sass',
    icon: <SiSass />
  },
  {
    name: 'JavaScript',
    icon: <FaJs />
  },
  {
    name: 'React',
    icon: <FaReact />
  },
  {
    name: 'Typescript',
    icon: <SiTypescript />
  },
  {
    name: 'Prettier',
    icon: <SiPrettier />
  },
  {
    name: 'ESLint',
    icon: <SiEslint />
  },
  {
    name: 'OAuth',
    icon: <TbBrandOauth />
  },
  {
    name: 'Angular',
    icon: <FaAngular />
  },
  {
    name: 'Ionic',
    icon: <SiIonic />
  },
  {
    name: 'ReactiveX',
    icon: <SiReactivex />
  },
  {
    name: 'Cordova',
    icon: <SiApachecordova />
  },
  {
    name: 'Jasmine',
    icon: <SiJasmine />
  },
  {
    name: 'Next.js',
    icon: <RiNextjsFill />
  },
  {
    name: 'Nest.js',
    icon: <SiNestjs />
  },
  {
    name: 'Vite',
    icon: <SiVite />
  },
  {
    name: 'Webpack',
    icon: <SiWebpack />
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />
  },
  {
    name: 'Redux',
    icon: <SiRedux />
  },
  {
    name: 'TypeORM',
    icon: <SiTypeorm />
  },
  {
    name: 'Fastify',
    icon: <SiFastify />
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb />
  },
  {
    name: 'Docker',
    icon: <SiDocker />
  }, 
  {
    name: 'Shadcn',
    icon: <SiShadcnui />
  },
  {
    name: 'Figma',
    icon: <SiFigma />
  },
  {
    name: 'Sketch',
    icon: <SiSketch />
  },
  {
    name: 'Apple Developer',
    icon: <FaAppStoreIos />
  },
  {
    name: 'Google Play Console',
    icon: <FaGooglePlay />
  },
  {
    name: 'Git',
    icon: <FaGit />
  },
  {
    name: 'Bitrise',
    icon: <SiBitrise />
  },
  {
    name: 'Jenkins',
    icon: <SiJenkins /> 
  },
  {
    name: 'Marvel',
    icon: <SiMarvelapp />
  },
  {
    name: 'jQuery',
    icon: <SiJquery />
  }
];

export default function SkillsSection() {
  const [query, setQuery] = useState('');
  const skills = useMemo(() => filterSkills(allSkills, query), [query]);

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h2 id="skills-heading" className="text-4xl sm:text-5xl">
          Skills
        </h2>
        <div className="relative w-full sm:w-auto min-w-0">
          <label htmlFor="skills-filter" className="sr-only">
            Filter skills
          </label>
          <input
            id="skills-filter"
            type="search"
            placeholder="FILTER"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-auto max-w-full pr-4 pl-2 py-2 border-b-2 text-xl font-spectral tracking-wider transition-colors duration-200"
            autoComplete="off"
          />
        </div>
      </div>
      {skills.length === 0 ? (
        <p role="status" className="text-lg text-[var(--color-primary)]">
          No skills match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
              <div className="flex items-center justify-center" aria-hidden="true">
                {React.cloneElement(skill.icon, { className: 'w-16 h-16 sm:w-20 sm:h-20 text-[var(--color-primary)]' })}
              </div>
              <p className="text-sm sm:text-md uppercase mt-2 text-[var(--color-primary)] text-center">{skill.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
