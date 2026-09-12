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
export const WELCOME_TAG = "Welcome to";

export const ARRIVED_LINE =
  "Nothing links here. You arrived by URL, which is the idea.";

export const HIT_COUNT = "001337";
export const HIT_SINCE = "May 12, 1997";

/** The hub portrait is chrome-owned; the public presentation keeps its own. */
export const HUB_PORTRAIT = {
  src: "/90s/autonomancer-western.jpg",
  width: 400,
  height: 400,
  alt: "Andrew Furusawa, the Autonomancer",
} as const;

/** What's New is period theater, not another work record. */
export const WHATS_NEW = {
  heading: "New Stuff!",
  date: "9/10/26",
  items: ["Daemonforge is online.", "The Autonomancer is in."],
  more: "More coming soon...",
} as const;

export const WORK_HELPER =
  "Client work, so there's nothing public to link. The stacks below are.";

export const SKILLS_HELPER =
  "Skills with a note are links. The rest are here for the record.";

export const WEBRING = {
  kicker: "MEMBER OF",
  name: "The Daemonforge Web Ring",
  nav: "[ PREV ] [ NEXT ] [ RANDOM ] [ LIST ]",
} as const;

export const COMING_SOON = "COMING SOON";
export const PACK_BADGE_NS = "NETSCAPE NOW!";
export const PACK_BADGE_SITE = "DAEMONFORGE";

export const WORK_TABLE = {
  caption: "Featured work by project, domain, period, and role",
  project: "Project",
  domain: "Domain",
  period: "Period",
  role: "Role",
} as const;

/** Link back to the directory — the breadcrumb's counterpart after a note. */
export const BACK_TO_DIRECTORY = "Back to the skills directory";
/** Canonical hash target for note breadcrumbs and recovery. */
export const NOTE_DIRECTORY_HREF = "/90s#skills";

/**
 * Unknown note slug. Two sentences: the first is plain text, the second is the
 * real link, so the recovery is the link text rather than a bare "here".
 */
export const NOTE_MISSING_LEAD = "That note doesn't exist.";
export const NOTE_MISSING_LINK = `${BACK_TO_DIRECTORY}.`;

export const FOOTER =
  "Best viewed at 800×600 · Built with Notepad · Daemonforge © 1997–2026";

/** The note routes' own footer garnish, aria-hidden and kept to a short mark. */
export const NOTE_FOOTER = "END OF FILE";
