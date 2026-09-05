/**
 * Locked homepage substance for `/`. Strings are verbatim from
 * [Spec: homepage rebuild from the capabilities page](https://github.com/afurusawa/andrewfurusawa/issues/81).
 */

export const identity = {
  name: "Andrew Furusawa",
  line: "Product & Software Delivery Consulting",
  location: "Inland Empire, CA · Remote",
  lede: "I've worked both sides — product owner and engineer. So I can take either seat, or hold both when the work needs one person to.",
  credentialLine:
    "12+ years shipping multi-platform mobile and web software. B.S. Information & Computer Science, UC Irvine.",
  credential: "Certified Scrum Product Owner · Scrum Alliance, 2026",
} as const;

export const whatIDo =
  "I take software products from concept to production in weeks instead of quarters, running the engineering process a full team would use. Agentic coding and LLM-assisted workflows set the pace. Scoped requirements, written acceptance criteria, code review, and test coverage are what keep it solid. Speed and quality are the same problem, not a tradeoff. What I hand off is something your engineers can own.";

export const whereIHelp = {
  quote:
    "Most wasted engineering effort traces back to a requirement everyone thought they understood the same way.",
  items: [
    {
      title: "Getting the right thing built",
      body: "I sit between stakeholders and engineering so the wrong thing doesn't get built. I turn what people say they want into what the software has to do, and surface the assumptions nobody stated — validated against real users through discovery and usability testing before it gets expensive to change. Information architecture, wireframes, and prototypes come out of that work.",
    },
    {
      title: "Building it the way a team would",
      body: "Those become PRDs, user stories, and acceptance criteria, and then I build against them with agentic tooling — which is where the speed comes from. The process underneath stays what any team would run: code standards, code review, branch strategy, CI/CD, decision records, and a test strategy that decides what actually warrants coverage instead of chasing a percentage.",
    },
    {
      title: "Multi-platform delivery",
      body: "Web, iOS, and Android from one codebase — React and Next.js, Ionic and Angular, or Flutter, chosen to fit what your team already runs. That includes moving an existing app onto a modern stack without stopping delivery.",
    },
    {
      title: "AI inside the product",
      body: "Where AI belongs in the product itself, I handle feasibility research, prompt architecture, and production implementation on a provider-agnostic foundation — so you're not locked into whichever model is winning this quarter.",
    },
  ],
} as const;

export const howIWork = [
  {
    title: "Discovery first.",
    body: "Engagements start with a short paid discovery sprint. I dig into the problem, prove or disprove the risky assumption, and come back with a plan and a realistic scope. Small commitment for you, and the larger engagement gets built on something real.",
  },
  {
    title: "Sprint-based, not spec-based.",
    body: "Product work rarely survives a fixed specification, because you learn what's possible by building it. Short cycles, each with a working deliverable and written acceptance criteria, mean you see progress as it happens instead of finding out at the end. Neither of us wants a surprise on delivery day.",
  },
  {
    title: "Handoff is the deliverable.",
    body: "Every engagement ends with documentation, specifications, and a codebase your team can maintain.",
  },
] as const;

export const recentWorkLeadIn = "Three engagements, most recent first.";

export const contactLeadIn =
  "Tell me what's stuck. The first step is a short discovery sprint, and a short email is enough to start it.";

export const portrait = {
  src: "/portrait.jpg",
  width: 400,
  height: 400,
  alt: "Andrew Furusawa",
} as const;

export const cspoBadge = {
  src: "/cspo-badge.png",
  width: 600,
  height: 600,
  alt: "Certified Scrum Product Owner badge, Scrum Alliance",
} as const;

export type HomepageSectionId =
  | "what"
  | "where"
  | "work"
  | "how"
  | "contact";

export type HomepageFigure = {
  value: string;
  label: string;
};

export type HomepageSection = {
  id: HomepageSectionId;
  label: string;
  caption: string;
  figures: readonly HomepageFigure[];
};

export const homepageSections: readonly HomepageSection[] = [
  {
    id: "what",
    label: "What I do",
    caption:
      "I take software products from concept to production in weeks instead of quarters, running the engineering process a full team would use.",
    figures: [
      { value: "12+", label: "years shipping software" },
      { value: "3", label: "industries: healthcare, IoT, education" },
    ],
  },
  {
    id: "where",
    label: "Where I help",
    caption: "Getting the right thing built",
    figures: [
      { value: "4", label: "ways teams bring me in" },
      { value: "1", label: "person, product to code" },
    ],
  },
  {
    id: "work",
    label: "Recent work",
    caption: recentWorkLeadIn,
    figures: [
      { value: "10+", label: "hospitals on one codebase" },
      { value: "70%", label: "faster for 20,000+ users" },
    ],
  },
  {
    id: "how",
    label: "How I work",
    caption: "Handoff is the deliverable.",
    figures: [
      { value: "<1 wk", label: "to a working prototype" },
      { value: "2 days", label: "to add speech in and out" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    caption: contactLeadIn,
    figures: [],
  },
];
