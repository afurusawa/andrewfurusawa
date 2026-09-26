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

/** Unfurl description. The hub does not render this line. */
export const ARRIVED_LINE =
  "Nothing links here. You arrived by URL, which is the idea.";

/** Principles that crawl above the welcome card. */
export const HUB_QUOTES = [
  "An agent is only as fast as the requirement it was handed.",
  "The making can be multiplied. What is worth making cannot.",
  "Speed without judgment is a faster wrong turn.",
] as const;

/** Experiment-only welcome card. The public homepage keeps its own lede. */
export const HUB_CREDO =
  "The ideal product owner knows what is worth building and why. The ideal designer makes that tangible and usable. The ideal engineer builds it efficiently and soundly. But those roles are often missing, so I work across the gap, with an agent fleet to keep the build running.";

export const HIT_COUNT = "001337";
export const HIT_SINCE = "May 12, 1997";

/** The hub portrait is chrome-owned; the public presentation keeps its own. */
export const HUB_PORTRAIT = {
  src: "/90s/autonomancer-western.jpg",
  width: 400,
  height: 400,
  alt: "Andrew Furusawa, the Autonomancer",
} as const;

/** Site news theater, plus the writing log in the same box. */
export const WHATS_NEW = {
  heading: "Updates",
  date: "9/10/26",
  items: ["Daemonforge is online.", "The Autonomancer is in."],
  more: "More coming soon...",
  lastUpdated: "Last updated",
  siteNews: "Site news",
  newBadge: "NEW!",
} as const;

export const WORK_HELPER =
  "Client work, so there's nothing public to link. The stacks below are.";

export const SKILLS_HELPER =
  "Skills with a note are links. The rest are here for the record.";

export const WRITING_HELPER =
  "Same pieces as the public site. The link leaves Daemonforge.";

export const WRITING_TABLE = {
  caption: "Writing by title and date",
  title: "Title",
  date: "Date",
} as const;

export const UPDATES_TABLE = {
  caption: "Writing by date and title",
  date: "Date",
  entry: "Entry",
} as const;

export const WEBRING = {
  kicker: "MEMBER OF",
  name: "The Daemonforge Web Ring",
  nav: "[ PREV ] [ NEXT ] [ RANDOM ] [ LIST ]",
} as const;

export const PACK_BADGE_NS = "NETSCAPE NOW!";
export const PACK_BADGE_SITE = "DAEMONFORGE";

export const WORK_TABLE = {
  caption: "Featured work by project, domain, period, and role",
  project: "Project",
  domain: "Domain",
  period: "Period",
  role: "Role",
} as const;

/**
 * Unknown path under /90s. Two sentences: the first is plain text, the second
 * is the real link, so the recovery is the link text rather than a bare "here".
 */
export const NOT_FOUND_LEAD = "That page doesn't exist.";
export const NOT_FOUND_LINK = "Back to Daemonforge.";
export const NOT_FOUND_HREF = "/90s";

export const FOOTER =
  "Best viewed at 800×600 · Built with Notepad · Daemonforge © 1997–2026";

/** The note routes' own footer garnish, aria-hidden and kept to a short mark. */
export const NOTE_FOOTER = "END OF FILE";
