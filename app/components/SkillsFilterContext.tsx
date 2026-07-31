"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { filterSkillNames } from "../lib/filterSkills";

type SkillsFilterContextValue = {
  query: string;
  setQuery: (query: string) => void;
  matchedNames: ReadonlySet<string>;
  emptyQuery: string | null;
};

const SkillsFilterContext = createContext<SkillsFilterContextValue | null>(
  null,
);

type SkillsFilterProviderProps = {
  skillNames: readonly string[];
  children: ReactNode;
};

/** Owns filter query and matched names for the skills section. */
export function SkillsFilterProvider({
  skillNames,
  children,
}: SkillsFilterProviderProps) {
  const [query, setQuery] = useState("");

  const matchedNames = useMemo(
    () => new Set(filterSkillNames(skillNames, query)),
    [query, skillNames],
  );

  const emptyQuery =
    query.trim() !== "" && matchedNames.size === 0 ? query : null;

  const value = useMemo(
    () => ({ query, setQuery, matchedNames, emptyQuery }),
    [query, matchedNames, emptyQuery],
  );

  return (
    <SkillsFilterContext.Provider value={value}>
      {children}
    </SkillsFilterContext.Provider>
  );
}

export function useSkillsFilter(): SkillsFilterContextValue {
  const value = useContext(SkillsFilterContext);
  if (!value) {
    throw new Error("useSkillsFilter must be used within SkillsFilterProvider");
  }
  return value;
}
