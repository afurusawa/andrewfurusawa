"use client";

import React, { useEffect, useMemo, useState } from "react";
import { filterSkills } from "../lib/filterSkills";
import { skillDomId } from "../lib/skillDomId";

type SkillsFilterProps = {
  skillNames: readonly string[];
};

export default function SkillsFilter({ skillNames }: SkillsFilterProps) {
  const [query, setQuery] = useState("");

  const matchedNames = useMemo(
    () =>
      new Set(
        filterSkills(
          skillNames.map((name) => ({ name })),
          query,
        ).map((skill) => skill.name),
      ),
    [query, skillNames],
  );

  useEffect(() => {
    for (const name of skillNames) {
      const el = document.getElementById(skillDomId(name));
      if (el) {
        el.hidden = !matchedNames.has(name);
      }
    }
  }, [matchedNames, skillNames]);

  return (
    <>
      <div className="relative w-full sm:w-auto min-w-0">
        <label htmlFor="skills-filter" className="sr-only">
          Filter skills
        </label>
        <input
          id="skills-filter"
          type="search"
          placeholder="FILTER"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full sm:w-auto max-w-full pr-4 pl-2 py-2 border-b-2 text-xl font-spectral tracking-wider transition-colors duration-200"
          autoComplete="off"
        />
      </div>
      {query.trim() !== "" && matchedNames.size === 0 ? (
        <p
          role="status"
          className="basis-full w-full text-lg text-[var(--color-primary)] mt-4 sm:mt-0"
        >
          No skills match &ldquo;{query}&rdquo;.
        </p>
      ) : null}
    </>
  );
}
