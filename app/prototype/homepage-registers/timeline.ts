/**
 * PROTOTYPE — the one piece of F worth keeping: the engagement timeline,
 * drawn from the real `period` strings on `featuredWork`. Lifted out of
 * VariantF in round 3 so H, I and J can each draw it their own way.
 */

export const AXIS_START = 2017;
export const AXIS_END = 2026;

/** Tick labels; AXIS_END renders as "now". */
export const AXIS_YEARS = [2017, 2019, 2021, 2023, 2026];

/** "2020–2024" / "2025–present" -> [start, end] on the axis. */
export function span(period: string): [number, number] {
  const match = period.match(/(\d{4})\D+(\d{4}|present)/i);
  if (!match) return [AXIS_START, AXIS_END];
  const start = Number(match[1]);
  const end = match[2].toLowerCase() === "present" ? AXIS_END : Number(match[2]);
  return [start, end];
}

/** Position of a year on the axis, 0–100. */
export function pct(year: number) {
  return ((year - AXIS_START) / (AXIS_END - AXIS_START)) * 100;
}

/** PROTOTYPE-only: outcome numerals, hand-pulled from the stub blurbs. */
export const METRICS: Record<string, { value: string; caption: string }> = {
  milktracker: { value: "10", caption: "hospitals live on one codebase" },
  "blossom-groconnect": { value: "70%", caption: "faster load for 20k+ users" },
  "ai-education-platform": { value: "1", caption: "platform, ground up" },
};
