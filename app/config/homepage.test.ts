import { describe, expect, it } from "vitest";
import {
  homepageSections,
  howIWork,
  identity,
  whatIDoSteps,
  whereIHelp,
} from "./homepage";

describe("homepage copy", () => {
  it("locks the spine headings in order", () => {
    expect(homepageSections.map((section) => section.label)).toEqual([
      "What I do",
      "Where I help",
      "Recent work",
      "How I work",
      "Contact",
    ]);
  });

  it("keeps the What I do panel caption compact", () => {
    expect(homepageSections[0].caption).toBe(
      "Product decisions to production code",
    );
  });

  it("locks colour-panel figure pairs and drops them on Contact", () => {
    expect(
      Object.fromEntries(
        homepageSections.map((section) => [section.id, section.figures]),
      ),
    ).toEqual({
      what: [
        { value: "12+", label: "years shipping software" },
        { value: "3", label: "industries: healthcare, IoT, education" },
      ],
      where: [
        { value: "4", label: "ways teams bring me in" },
        { value: "1", label: "person, product to code" },
      ],
      work: [
        { value: "10+", label: "hospitals on one codebase" },
        { value: "70%", label: "faster for 20,000+ users" },
      ],
      how: [
        { value: "<1 wk", label: "to a working prototype" },
        { value: "2 days", label: "to add speech in and out" },
      ],
      contact: [],
    });
  });

  it("locks the identity cluster", () => {
    expect(identity).toEqual({
      name: "Andrew Furusawa",
      line: "Product & Software Delivery Consulting",
      location: "Inland Empire, CA",
      lede:
        "I turn ambiguous requirements into shipped software. I run discovery with the people who use the product, write the user stories and acceptance criteria that keep a team pointed at the right thing, and stay close enough to the code to know what a request actually costs.",
      credentialLine:
        "12+ years shipping multi-platform mobile and web software across healthcare, consumer IoT, and eduction.",
      credential: "Certified Scrum Product Owner · Scrum Alliance, 2026",
    });
  });

  it("locks What I do, Where I help, and How I work", () => {
    expect(whatIDoSteps).toEqual([
      { title: "Clarify", body: "Discovery, user research, usability testing" },
      { title: "Define", body: "Wireframes, PRDs, acceptance criteria" },
      { title: "Deliver", body: "Production code, tests, documentation, handoff" },
    ]);
    expect(whereIHelp.quote).toBe(
      "Most wasted engineering effort traces back to a requirement everyone thought they understood the same way.",
    );
    expect(whereIHelp.items.map((item) => item.title)).toEqual([
      "Getting the right thing built",
      "Building it the way a team would",
      "Multi-platform delivery",
      "AI inside the product",
    ]);
    expect(howIWork.map((item) => item.title)).toEqual([
      "Discovery first.",
      "Sprint-based, not spec-based.",
      "Handoff is the deliverable.",
    ]);
  });
});
