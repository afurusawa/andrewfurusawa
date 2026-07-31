/**
 * Filter skill names against a query, always starting from the full collection.
 */
export function filterSkillNames(
  names: readonly string[],
  query: string,
): string[] {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") {
    return [...names];
  }

  return names.filter((name) => name.toLowerCase().includes(normalized));
}
