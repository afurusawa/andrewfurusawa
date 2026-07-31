export function skillDomId(name: string): string {
  return `skill-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
