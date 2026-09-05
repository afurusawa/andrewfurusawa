import type { FeaturedProjectPeriod } from "../config/featuredWork";

export const AXIS_START = 2017;
export const AXIS_END = 2027;

/** Tick labels; AXIS_END renders as "now". */
export const AXIS_YEARS = [2017, 2019, 2021, 2023, 2026, 2027] as const;

export function projectSpan(
  project: FeaturedProjectPeriod,
): [number, number] {
  return [project.start, project.end === "present" ? AXIS_END : project.end];
}

/** Position of a year on the shared axis, 0–100. */
export function axisPercent(year: number): number {
  return ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}
