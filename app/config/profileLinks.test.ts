import { describe, expect, it } from "vitest";
import { contactLinks, socialProfileLinks } from "./profileLinks";

describe("profileLinks", () => {
  it("points social profiles at Andrew's intended destinations", () => {
    const hrefs = socialProfileLinks.map((link) => link.href);
    expect(hrefs).toEqual([
      "https://github.com/afurusawa",
      "https://linkedin.com/in/afurusawa",
    ]);
  });

  it("includes email and the same social profiles for contact", () => {
    expect(contactLinks.map((link) => link.href)).toEqual([
      "mailto:andrewfurusawa@gmail.com",
      "https://github.com/afurusawa",
      "https://linkedin.com/in/afurusawa",
    ]);
  });

  it("gives every link an accessible name and visible label", () => {
    for (const link of contactLinks) {
      expect(link.ariaLabel.length).toBeGreaterThan(0);
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it("does not publish a phone number", () => {
    const hrefs = [...socialProfileLinks, ...contactLinks].map(
      (link) => link.href,
    );
    expect(hrefs.some((href) => href.startsWith("tel:"))).toBe(false);
  });
});
