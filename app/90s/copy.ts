export {
  contactLeadIn as homepageContactLeadIn,
  howIWork as homepageHowIWork,
  identity as homepageIdentity,
  recentWorkLeadIn as homepageRecentWorkLeadIn,
  whatIDoHeading as homepageWhatIDoHeading,
  whatIDoSteps as homepageWhatIDoSteps,
  whereIHelp as homepageWhereIHelp,
} from "../config/homepage";

export const SITE_NAME = "Daemonforge";
export const HANDLE = "Autonomancer";
export const HUB_HEADING = SITE_NAME;

export const ARRIVED_LINE =
  "Nothing links here. You arrived by URL, which is the idea.";

/** The hub portrait is chrome-owned; the public presentation keeps its own. */
export const HUB_PORTRAIT = {
  src: "/90s/autonomancer-western.jpg",
  width: 400,
  height: 400,
  alt: "Andrew Furusawa, the Autonomancer",
} as const;

/** What's New is period theater, not another work record. */
export const WHATS_NEW = [
  "New window, same signal.",
  "Notes are now connected to the directory.",
  "Construction continues at the edge of the map.",
] as const;

export const WHATS_NEW_TITLE = "What's New";
export const WHATS_NEW_LABEL = "fresh signal";
export const WHATS_NEW_STAMP = "NEW!";

export const WORK_HELPER =
  "Client work, so there's nothing public to link. The stacks below are.";

export const SKILLS_HELPER =
  "Skills with a note are links. The rest are here for the record.";

/** Link back to the directory — the breadcrumb's counterpart after a note. */
export const BACK_TO_DIRECTORY = "Back to the skills directory";

/**
 * Unknown note slug. Two sentences: the first is plain text, the second is the
 * real link, so the recovery is the link text rather than a bare "here".
 */
export const NOTE_MISSING_LEAD = "That note doesn't exist.";
export const NOTE_MISSING_LINK = `${BACK_TO_DIRECTORY}.`;

export const PANE_GARNISH = {
  welcome: "Welcome, traveler",
  what: "Services online",
  where: "Choose your route",
  work: "Now shipping",
  how: "Field manual",
  skills: "Signal acquired",
  contact: "Open channels",
} as const;

export const WEBRING = {
  title: "Webring",
  body: "This ring is theater: no working links, just a circle in the margins.",
} as const;

export const WORK_TABLE = {
  caption: "Featured work by project, domain, period, and role",
  project: "Project",
  domain: "Domain",
  period: "Period",
  role: "Role",
} as const;

export const FOOTER =
  "Best viewed at 1024×768 · Built with notepad energy · No web ring membership";

/** The note routes' own footer garnish, aria-hidden and kept to a short mark. */
export const NOTE_FOOTER = "END OF FILE";
