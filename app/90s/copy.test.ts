import { describe, expect, it } from "vitest";
import {
  contactLeadIn,
  howIWork,
  identity,
  recentWorkLeadIn,
  whatIDoHeading,
  whatIDoSteps,
  whereIHelp,
} from "../config/homepage";
import {
  ARRIVED_LINE,
  BACK_TO_DIRECTORY,
  HANDLE,
  homepageContactLeadIn,
  homepageHowIWork,
  homepageIdentity,
  homepageRecentWorkLeadIn,
  homepageWhatIDoHeading,
  homepageWhatIDoSteps,
  homepageWhereIHelp,
  HUB_HEADING,
  NOTE_MISSING_LEAD,
  NOTE_MISSING_LINK,
  SITE_NAME,
  SKILLS_HELPER,
  WORK_HELPER,
} from "./copy";

describe("/90s voice-law copy", () => {
  it("names Daemonforge and Andrew's experiment handle", () => {
    expect(SITE_NAME).toBe("Daemonforge");
    expect(HUB_HEADING).toBe("Daemonforge");
    expect(HANDLE).toBe("Autonomancer");
  });

  it("keeps the arrived line as experiment-only garnish", () => {
    expect(ARRIVED_LINE).toBe(
      "Nothing links here. You arrived by URL, which is the idea.",
    );
  });

  it("consumes the homepage offer instead of forking its fields", () => {
    expect(homepageIdentity).toBe(identity);
    expect(homepageWhatIDoHeading).toBe(whatIDoHeading);
    expect(homepageWhatIDoSteps).toBe(whatIDoSteps);
    expect(homepageWhereIHelp).toBe(whereIHelp);
    expect(homepageHowIWork).toBe(howIWork);
    expect(homepageRecentWorkLeadIn).toBe(recentWorkLeadIn);
    expect(homepageContactLeadIn).toBe(contactLeadIn);
  });

  it("explains link-free work with the locked helper", () => {
    expect(WORK_HELPER).toBe(
      "Client work, so there's nothing public to link. The stacks below are.",
    );
  });

  it("states the publish-set split with the locked skills helper", () => {
    expect(SKILLS_HELPER).toBe(
      "Skills with a note are links. The rest are here for the record.",
    );
  });

  it("states the unknown note with the locked copy, the link last", () => {
    expect(`${NOTE_MISSING_LEAD} ${NOTE_MISSING_LINK}`).toBe(
      "That note doesn't exist. Back to the skills directory.",
    );
  });

  it("names the escape after a note in plain words", () => {
    expect(BACK_TO_DIRECTORY).toBe("Back to the skills directory");
  });
});
