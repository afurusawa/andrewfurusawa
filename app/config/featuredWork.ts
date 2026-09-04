export type FeaturedProjectPeriod = {
  start: number;
  end: number | "present";
};

export type FeaturedProject = FeaturedProjectPeriod & {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  client?: string;
  domain: string;
  /** Catalogue slugs from `skills.ts`. */
  stack: string[];
  outcomes: { result: string; figure?: string }[];
  links?: { label: string; href: string }[];
};

/** Format the one shared period label used by both presentations. */
export function formatProjectPeriod(
  project: FeaturedProjectPeriod,
): string {
  return `${project.start}\u2013${project.end}`;
}

/** Format the experiment's role/client line without duplicating its join rule. */
export function formatProjectRole(
  project: Pick<FeaturedProject, "role" | "client">,
): string {
  return project.client ? `${project.role}, ${project.client}` : project.role;
}

/**
 * Featured work, shared by every presentation. Membership in this array is
 * featuring — there is no `featured` flag — and the order is hand-curated.
 * Capped at three; there is no floor. All three have nothing public to link,
 * so none of them carry `links`.
 */
export const featuredWork: readonly FeaturedProject[] = [
  {
    slug: "ai-debate-practice",
    title: "AI debate practice platform",
    blurb:
      "Took an AI debate-practice product from an open feasibility question to a working application, solo — prompt architecture that holds models to each phase of a round, and judge scoring paradigms converted into a usable rubric.",
    role: "Independent consultant",
    domain: "Education",
    start: 2026,
    end: "present",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
    outcomes: [
      {
        figure: "<1 wk",
        result:
          "Working prototype in under a week, provider-agnostic across two model vendors",
      },
      {
        figure: "2 days",
        result: "Speech in and out added in two days, paced to competition time limits",
      },
      {
        result:
          "Opposing models able to debate each other, with phase timers and live user-vs-model rounds",
      },
    ],
  },
  {
    slug: "milktracker",
    title: "MilkTracker",
    blurb:
      "Hired to maintain a legacy Objective-C iOS app, I proposed and led the multi-platform rework that replaced it — one Angular and Ionic codebase across web, iOS and Android.",
    role: "Lead front-end developer",
    client: "AngelEye Health",
    domain: "Healthcare",
    start: 2020,
    end: 2024,
    stack: ["angular", "ionic", "typescript", "rxjs", "jasmine"],
    outcomes: [
      {
        figure: "10+",
        result: "In production across more than ten hospitals nationwide, up from three",
      },
      {
        result:
          "Eliminated a recurring scanner licensing cost by implementing barcode scanning natively",
      },
      {
        result:
          "Introduced the development process, documentation and specifications the team had been operating without",
      },
    ],
  },
  {
    slug: "blossom-groconnect",
    title: "Blossom / GroConnect",
    blurb:
      "Led a distributed front-end and QA team on connected-device apps, inheriting a smart-irrigation controller at acquisition and unifying the device family under one app platform.",
    role: "Lead mobile app developer",
    client: "Scotts Miracle-Gro",
    domain: "Consumer IoT",
    start: 2017,
    end: 2020,
    stack: ["ionic", "cordova", "angular", "typescript", "bitrise"],
    outcomes: [
      {
        figure: "70%",
        result:
          "Load time improved by over 70% for 20,000+ users within months of the acquisition",
      },
      {
        result:
          "Consolidated a fragmented smart-gardening device portfolio into one app platform",
      },
      {
        result:
          "A shared Flutter library standardising future lawn-care applications onto one framework",
      },
    ],
  },
];
