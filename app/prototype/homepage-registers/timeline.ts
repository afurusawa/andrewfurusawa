/**
 * PROTOTYPE — the one piece of F worth keeping: the engagement timeline,
 * drawn from the structured dates on `featuredWork`. Lifted out of VariantF
 * in round 3 so H, I and J can each draw it their own way.
 */
import type { FeaturedProjectPeriod } from "../../config/featuredWork";

export const AXIS_START = 2017;
// Keep a full year of headroom so a project that starts this year has a
// visible bar while `present` remains the right edge of the prototype axis.
export const AXIS_END = 2027;

/** Tick labels; AXIS_END renders as "now". */
export const AXIS_YEARS = [2017, 2019, 2021, 2023, 2026, 2027];

/** Convert a project's structured dates to the prototype's axis span. */
export function span(
  project: FeaturedProjectPeriod,
): [number, number] {
  return [
    project.start,
    project.end === "present" ? AXIS_END : project.end,
  ];
}

/** Position of a year on the axis, 0–100. */
export function pct(year: number) {
  return ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

/** PROTOTYPE-only: outcome numerals, hand-pulled from the stub blurbs. */
export const METRICS: Record<string, { value: string; caption: string }> = {
  milktracker: { value: "10", caption: "hospitals live on one codebase" },
  "blossom-groconnect": { value: "70%", caption: "faster load for 20k+ users" },
  "ai-debate-practice": {
    value: "<1 wk",
    caption: "working prototype in under a week",
  },
};
