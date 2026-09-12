import { describe, expect, it } from "vitest";
import { kitschDate } from "./kitschDate";

describe("kitschDate", () => {
  it("prints a GeoCities M/D/YY stamp from an ISO date", () => {
    expect(kitschDate("2026-09-12")).toBe("9/12/26");
    expect(kitschDate("1997-05-01")).toBe("5/1/97");
  });

  it("passes through a value that is not YYYY-MM-DD", () => {
    expect(kitschDate("9/10/26")).toBe("9/10/26");
  });
});
