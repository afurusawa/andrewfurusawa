"use client";

import React, { type ReactNode } from "react";
import { useSkillsFilter } from "./SkillsFilterContext";

type SkillTileProps = {
  slug: string;
  name: string;
  children: ReactNode;
};

/**
 * Client visibility wrapper. Server-rendered icon/label content is passed as
 * children so static markup stays outside the filter island's data work.
 */
export default function SkillTile({ slug, name, children }: SkillTileProps) {
  const { matchedNames } = useSkillsFilter();

  if (!matchedNames.has(name)) {
    return null;
  }

  return (
    <div
      id={`skill-${slug}`}
      className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32"
    >
      {children}
    </div>
  );
}
