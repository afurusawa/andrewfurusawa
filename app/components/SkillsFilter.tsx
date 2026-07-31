"use client";

import React from "react";
import { useSkillsFilter } from "./SkillsFilterContext";

/** Filter control; matched visibility is applied by SkillTile via shared context. */
export default function SkillsFilter() {
  const { query, setQuery, emptyQuery } = useSkillsFilter();

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
      {emptyQuery !== null ? (
        <p
          role="status"
          className="basis-full w-full text-lg text-[var(--color-primary)] mt-4 sm:mt-0"
        >
          No skills match &ldquo;{emptyQuery}&rdquo;.
        </p>
      ) : null}
    </>
  );
}
