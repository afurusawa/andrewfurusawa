export type NamedSkill = {
  name: string;
};

export function filterSkills<T extends NamedSkill>(
  skills: readonly T[],
  query: string,
): T[] {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return [...skills];
  }

  return skills.filter((skill) =>
    skill.name.toLowerCase().includes(normalized),
  );
}
