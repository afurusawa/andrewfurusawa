/**
 * PROTOTYPE — stub substance for the homepage register prototypes.
 *
 * The capabilities page has not been transcribed yet (see
 * https://github.com/afurusawa/andrewfurusawa/issues/68), so the prose here is
 * PLACEHOLDER written to the locked spine and offer, not final copy. Judge the
 * layouts, not the words. Projects and contact channels are the real shared
 * substance from `app/config`.
 */
import { featuredWork } from "../../config/featuredWork";
import { contactLinks } from "../../config/profileLinks";

export const identity = {
  name: "Andrew Furusawa",
  line: "Product & Software Delivery Consulting",
  lede: "I help teams get unclear product work moving — scoping it, building it, and shipping it with a small team or on my own.",
};

export const whatIDo = {
  label: "What I do",
  statement:
    "I take product ideas that are stuck at the document stage and turn them into released software.",
  body: [
    "Most of my work is lead front-end and mobile delivery: one codebase across web and native, a release cadence people can plan around, and a stack the team can still change a year later.",
    "I work with founders who need a first version and with teams who have inherited something they cannot safely touch. Same job either way — find the real constraint, make it small, ship it.",
  ],
};

export const whereIHelp = {
  label: "Where I help",
  items: [
    {
      title: "Delivery that has stalled",
      body: "A release that has slipped twice and nobody can name why. I find the constraint and get a credible date back on the board.",
    },
    {
      title: "Idea to first release",
      body: "A product that exists as a spec. I scope it, sequence it, and build the version that can go in front of real users.",
    },
    {
      title: "Inherited codebases",
      body: "An app that came with an acquisition or outgrew its first build. I stabilise it, make it fast, and make it safe to change.",
    },
    {
      title: "Senior front-end voice",
      body: "Standing in as the technical lead for a team that does not have one yet — architecture, review, and the calls that unblock people.",
    },
  ],
};

export const recentWork = {
  label: "Recent work",
  helper: "Three engagements, most recent first.",
  projects: featuredWork,
};

export const howIWork = {
  label: "How I work",
  items: [
    {
      title: "Small releases, early",
      body: "Something real in front of users in weeks, then a rhythm — not one long build with a launch at the end.",
    },
    {
      title: "Decisions written down",
      body: "The reasoning lives in the repo, so the next person does not have to re-litigate it.",
    },
    {
      title: "One codebase where one will do",
      body: "Web and native from a shared build unless there is a reason not to. Less surface, fewer places to be wrong.",
    },
    {
      title: "Accessible by default",
      body: "WCAG 2.2 AA is part of building the thing, not a pass at the end of it.",
    },
  ],
};

export const contact = {
  label: "Contact",
  invitation: "Tell me what is stuck. A short email is enough to start.",
  primary: contactLinks[0],
  links: contactLinks,
};

/** Portrait, added round 3 so the page has a face on it. */
export const portrait = {
  src: "/prototype/profile.jpg",
  width: 400,
  height: 400,
  alt: "Andrew Furusawa",
};

/**
 * Credentials. PLACEHOLDER framing around one real, current credential —
 * CSPO, awarded August 2026 by Scrum Alliance.
 */
export const credentials = {
  label: "Credentials",
  items: [
    {
      id: "cspo",
      name: "Certified Scrum Product Owner",
      short: "CSPO",
      issuer: "Scrum Alliance",
      year: "2026",
      badge: "/prototype/cspo-badge.png",
      alt: "Certified Scrum Product Owner badge, Scrum Alliance",
    },
  ],
};

/**
 * Per-stage figures for the H stage. PLACEHOLDER except the "work" pair, which
 * comes from the real engagement blurbs. Round 4: the stage needed substance
 * that changes as you scroll, not just a label.
 */
export const stageFigures: Record<string, { value: string; label: string }[]> = {
  what: [
    { value: "9", label: "years shipping product" },
    { value: "3", label: "named engagements" },
  ],
  where: [
    { value: "4", label: "ways teams bring me in" },
    { value: "1", label: "narrative, product to code" },
  ],
  work: [
    { value: "10", label: "hospitals on one codebase" },
    { value: "70%", label: "faster for 20k+ users" },
  ],
  how: [
    { value: "1–2 wk", label: "to a credible date" },
    { value: "0", label: "handover cliffs" },
  ],
  contact: [
    { value: "48 h", label: "typical reply" },
    { value: "CSPO", label: "Scrum Alliance, 2026" },
  ],
};
