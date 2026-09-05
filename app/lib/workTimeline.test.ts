import { describe, expect, it } from "vitest";
import {
  AXIS_END,
  AXIS_START,
  AXIS_YEARS,
  axisPercent,
  projectSpan,
} from "./workTimeline";

describe("work timeline", () => {
  it("places 2017 at the left edge and 2027 at the right", () => {
    expect(AXIS_START).toBe(2017);
    expect(AXIS_END).toBe(2027);
    expect(axisPercent(2017)).toBe(0);
    expect(axisPercent(2027)).toBe(100);
    expect(axisPercent(2022)).toBe(50);
  });

  it("maps present to the right edge and keeps the locked ticks", () => {
    expect(projectSpan({ start: 2026, end: "present" })).toEqual([2026, 2027]);
    expect(projectSpan({ start: 2020, end: 2024 })).toEqual([2020, 2024]);
    expect(AXIS_YEARS).toEqual([2017, 2019, 2021, 2023, 2026, 2027]);
  });
});
