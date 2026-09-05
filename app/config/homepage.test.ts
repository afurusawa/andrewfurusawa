import { describe, expect, it } from "vitest";
import {
  homepageSections,
  howIWork,
  identity,
  whatIDo,
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
      location: "Inland Empire, CA · Remote",
      lede: "I've worked both sides — product owner and engineer. So I can take either seat, or hold both when the work needs one person to.",
      credentialLine:
        "12+ years shipping multi-platform mobile and web software. B.S. Information & Computer Science, UC Irvine.",
      credential: "Certified Scrum Product Owner · Scrum Alliance, 2026",
    });
  });

  it("locks What I do, Where I help, and How I work", () => {
    expect(whatIDo).toBe(
      "I take software products from concept to production in weeks instead of quarters, running the engineering process a full team would use. Agentic coding and LLM-assisted workflows set the pace. Scoped requirements, written acceptance criteria, code review, and test coverage are what keep it solid. Speed and quality are the same problem, not a tradeoff. What I hand off is something your engineers can own.",
    );
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
