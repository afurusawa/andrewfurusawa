'use client';

import React, { useState } from 'react';
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

const data = [
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
  const [skills, setSkills] = useState(data);

  const handleFilterSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredSkills = e.target.value === '' 
      ? data 
      : skills.filter(skill => {
          return skill.name.toLowerCase().includes(e.target.value.toLowerCase())
        });
    setSkills(filteredSkills);
  }

  return (
    <section id="skills">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-5xl">
          Skills
        </h2>
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="FILTER"
              className="pr-4 pl-2 py-2 border-b-2 focus:outline-none text-xl font-spectral tracking-wider transition-colors duration-200"
              onChange={handleFilterSkills}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center justify-center border-0 border-red-500 w-32 h-32">
            <div className="flex items-center justify-center">
              {React.cloneElement(skill.icon, { className: 'w-20 h-20' })}
            </div>
            <p className="text-md uppercase mt-2">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 