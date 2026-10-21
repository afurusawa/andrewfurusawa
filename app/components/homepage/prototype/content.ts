/** PROTOTYPE: proposed copy, deliberately separate from the locked offer. */
export const variants = [
  {
    key: "A",
    name: "Refined split",
    description: "Keep the changing sidebar. Bring the offer, email action, and proof into the opening.",
    structure: "Offer → capabilities → work → process → contact",
    mobile: "Compact identity and offer first; colored section labels replace tall title cards.",
  },
  {
    key: "B",
    name: "Work first",
    description: "Replace the sidebar with a horizontal masthead. Let three project outcomes lead the page.",
    structure: "Offer → work → capabilities → process → contact",
    mobile: "One column of project stories; metrics sit above full-width descriptions.",
  },
  {
    key: "C",
    name: "Start with the problem",
    description: "Lead with the visitor’s situation. Each problem links to the relevant capability.",
    structure: "Client situations → discovery invitation → work → capabilities → process → contact",
    mobile: "Short introduction and three useful jump links before any long-form copy.",
  },
] as const;

export type VariantKey = (typeof variants)[number]["key"];

export const offer = {
  heading: "Make the problem clear before the code gets expensive.",
  lede: "I turn ambiguous requirements into shipped software—from discovery with real users to production code your team can maintain.",
  context: "12+ years across healthcare, consumer IoT, and education.",
  email: "mailto:andrewfurusawa@gmail.com",
};

export const capabilities = [
  {
    id: "clarity",
    title: "Get the right thing built.",
    outcome: "Turn competing expectations into a scope everyone understands.",
    detail: "Discovery, user research, and usability testing surface risky assumptions. Wireframes, PRDs, and acceptance criteria make the next step concrete.",
    situation: "We know the problem. The scope is still unclear.",
    action: "Clarify the product",
  },
  {
    id: "delivery",
    title: "Take the plan into production.",
    outcome: "One person accountable from product decisions to working software.",
    detail: "I build with agentic tooling, code review, CI/CD, and a test strategy suited to the risk. Working deliverables keep progress visible.",
    situation: "We need someone who can define it and build it.",
    action: "Move into delivery",
  },
  {
    id: "platforms",
    title: "Reach every platform.",
    outcome: "Web, iOS, and Android from a codebase your team can own.",
    detail: "React, Next.js, Ionic, Angular, or Flutter—chosen for your team. Modernize an existing app while keeping delivery moving.",
    situation: "Our app needs to grow beyond its current stack.",
    action: "Modernize the platform",
  },
  {
    id: "ai",
    title: "Find where AI earns its place.",
    outcome: "Prove feasibility before making a larger product commitment.",
    detail: "Research, prompt architecture, and production implementation on a foundation that can work across model providers.",
    situation: "We have an AI idea. We need to know if it works.",
    action: "Test the idea",
  },
] as const;

export const process = [
  { title: "Start with discovery.", body: "A short paid sprint tests the risky assumption and gives you a plan with realistic scope." },
  { title: "Build in short cycles.", body: "Each sprint ends with working software and written acceptance criteria. You see progress as it happens." },
  { title: "Leave a clean handoff.", body: "Documentation, specifications, and a codebase your team can maintain are part of the deliverable." },
] as const;
