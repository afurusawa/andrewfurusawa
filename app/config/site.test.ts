import { describe, expect, it } from "vitest";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from "./site";

describe("site config", () => {
  it("uses the .dev production domain as the site origin", () => {
    expect(SITE_URL).toBe("https://andrewfurusawa.dev");
  });

  it("exposes the locked offer title and description for metadata", () => {
    expect(SITE_TITLE).toBe(
      "Andrew Furusawa · Product & Software Delivery Consulting",
    );
    expect(SITE_DESCRIPTION).toBe(
      "I take software products from concept to production in weeks, not quarters, with the engineering discipline a full team would run.",
    );
  });

  it("builds absolute URLs from the production origin", () => {
    expect(absoluteUrl()).toBe("https://andrewfurusawa.dev");
    expect(absoluteUrl("/")).toBe("https://andrewfurusawa.dev");
    expect(absoluteUrl("/sitemap.xml")).toBe(
      "https://andrewfurusawa.dev/sitemap.xml",
    );
  });
});
