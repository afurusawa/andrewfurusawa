import { describe, expect, it } from "vitest";
import {
  ABOUT_PARAGRAPHS,
  CONTACT_LEAD_IN,
  EYEBROW,
  HUB_HEADING,
} from "./copy";

describe("/90s voice-law copy", () => {
  it("uses Andrew Furusawa as the hub heading and Neon Cyber Basement as the eyebrow", () => {
    expect(HUB_HEADING).toBe("Andrew Furusawa");
    expect(EYEBROW).toBe("Neon Cyber Basement");
  });

  it("locks the experiment About as the three spec paragraphs", () => {
    expect(ABOUT_PARAGRAPHS).toEqual([
      "Nothing links here. You arrived by URL, which is the idea.",
      "I'm a front-end developer, twelve years in, most of it taking web applications from discovery through release and then living with them afterwards. The part I like is the middle — turning a vague requirement into something people can actually click.",
      "The skills below aren't a checklist. Where I have something worth saying about a tool, it's a link: where I used it, why it fit, and what it taught me.",
    ]);
  });

  it("keeps the contact lead-in as plain words", () => {
    expect(CONTACT_LEAD_IN).toBe("Email is best:");
  });
});
