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
  HANDLE,
  HUB_CREDO,
  HUB_PORTRAIT,
  HUB_QUOTES,
  homepageContactLeadIn,
  homepageHowIWork,
  homepageIdentity,
  homepageRecentWorkLeadIn,
  homepageWhatIDoHeading,
  homepageWhatIDoSteps,
  homepageWhereIHelp,
  HUB_HEADING,
  NOT_FOUND_HREF,
  NOT_FOUND_LEAD,
  NOT_FOUND_LINK,
  SITE_NAME,
  SKILLS_HELPER,
  WEBRING,
  WRITING_HELPER,
  WHATS_NEW,
  WORK_HELPER,
} from "./copy";

describe("/90s voice-law copy", () => {
  it("names Daemonforge and Andrew's experiment handle", () => {
    expect(SITE_NAME).toBe("Daemonforge");
    expect(HUB_HEADING).toBe("Daemonforge");
    expect(HANDLE).toBe("Autonomancer");
  });

  it("keeps the arrived line as the unfurl description", () => {
    expect(ARRIVED_LINE).toBe(
      "Nothing links here. You arrived by URL, which is the idea.",
    );
  });

  it("states the hub principles and the welcome credo", () => {
    expect(HUB_QUOTES).toEqual([
      "An agent is only as fast as the requirement it was handed.",
      "The making can be multiplied. What is worth making cannot.",
      "Speed without judgment is a faster wrong turn.",
    ]);
    expect(HUB_CREDO).toBe(
      "The ideal product owner knows what is worth building and why. The ideal designer makes that tangible and usable. The ideal engineer builds it efficiently and soundly. But those roles are often missing, so I work across the gap, with an agent fleet to keep the build running.",
    );
  });

  it("keeps the portrait and Updates box in experiment chrome", () => {
    expect(HUB_PORTRAIT).toEqual({
      src: "/90s/autonomancer-western.jpg",
      width: 400,
      height: 400,
      alt: "Andrew Furusawa, the Autonomancer",
    });
    expect(WHATS_NEW.heading).toBe("Updates");
    expect(WHATS_NEW.items).toEqual([
      "Daemonforge is online.",
      "The Autonomancer is in.",
    ]);
  });

  it("describes the webring as explicit no-link theater", () => {
    expect(WEBRING).toEqual({
      kicker: "MEMBER OF",
      name: "The Daemonforge Web Ring",
      nav: "[ PREV ] [ NEXT ] [ RANDOM ] [ LIST ]",
    });
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

  it("warns that writing links leave the experiment", () => {
    expect(WRITING_HELPER).toBe(
      "Same pieces as the public site. The link leaves Daemonforge.",
    );
  });

  it("states the publish-set split with the locked skills helper", () => {
    expect(SKILLS_HELPER).toBe(
      "Skills with a note are links. The rest are here for the record.",
    );
  });

  it("recovers an unknown path to the hub, with the link last", () => {
    expect(`${NOT_FOUND_LEAD} ${NOT_FOUND_LINK}`).toBe(
      "That page doesn't exist. Back to Daemonforge.",
    );
    expect(NOT_FOUND_HREF).toBe("/90s");
  });
});
