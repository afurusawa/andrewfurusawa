export const HUB_HEADING = "Andrew Furusawa";
export const EYEBROW = "Neon Cyber Basement";
export const ROLE = "Front-End Developer";

export const ABOUT_PARAGRAPHS = [
  "Nothing links here. You arrived by URL, which is the idea.",
  "I'm a front-end developer, twelve years in, most of it taking web applications from discovery through release and then living with them afterwards. The part I like is the middle — turning a vague requirement into something people can actually click.",
  "The skills below aren't a checklist. Where I have something worth saying about a tool, it's a link: where I used it, why it fit, and what it taught me.",
] as const;

export const WORK_HELPER =
  "Client work, so there's nothing public to link. The stacks below are.";

export const SKILLS_HELPER =
  "Skills with a note are links. The rest are here for the record.";

export const CONTACT_LEAD_IN = "Email is best:";

/** Link back to the directory — the breadcrumb's counterpart after a note. */
export const BACK_TO_DIRECTORY = "Back to the skills directory";

/**
 * Unknown note slug. Two sentences: the first is plain text, the second is the
 * real link, so the recovery is the link text rather than a bare "here".
 */
export const NOTE_MISSING_LEAD = "That note doesn't exist.";
export const NOTE_MISSING_LINK = `${BACK_TO_DIRECTORY}.`;

export const PANE_GARNISH = {
  about: "Welcome, traveler",
  work: "Now shipping",
  skills: "Signal acquired",
  contact: "Open channels",
} as const;

export const FOOTER =
  "Best viewed at 1024×768 · Built with notepad energy · No web ring membership";

/** The note routes' own footer garnish, aria-hidden and kept to a short mark. */
export const NOTE_FOOTER = "END OF FILE";
