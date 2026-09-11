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
  work: "Now shipping",
  skills: "Signal acquired",
  contact: "Open channels",
} as const;

export const FOOTER =
  "Best viewed at 1024×768 · Built with notepad energy · No web ring membership";

/** The note routes' own footer garnish, aria-hidden and kept to a short mark. */
export const NOTE_FOOTER = "END OF FILE";
