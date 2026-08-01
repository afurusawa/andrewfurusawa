import React from "react";
import { skills } from "../config/skills";
import SkillsFilter from "./SkillsFilter";
import SkillTile from "./SkillTile";
import { SkillsFilterProvider } from "./SkillsFilterContext";

const skillNames = skills.map((skill) => skill.name);

/** Server Component: skill icons render on the server; filter state lives in the provider. */
export default function SkillsSection() {
  return (
    <SkillsFilterProvider skillNames={skillNames}>
      <section id="skills" aria-labelledby="skills-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:flex-wrap mb-8">
          <h2 id="skills-heading" className="text-4xl sm:text-5xl">
            Skills
          </h2>
          <SkillsFilter />
        </div>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <SkillTile key={skill.name} name={skill.name}>
                <div className="flex items-center justify-center" aria-hidden="true">
                  <Icon className="w-16 h-16 sm:w-20 sm:h-20 text-[var(--color-primary)]" />
                </div>
                <p className="text-sm sm:text-md uppercase mt-2 text-[var(--color-primary)] text-center">
                  {skill.name}
                </p>
              </SkillTile>
            );
          })}
        </div>
      </section>
    </SkillsFilterProvider>
  );
}
