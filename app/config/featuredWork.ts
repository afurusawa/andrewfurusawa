export type FeaturedProject = {
  slug: string;
  title: string;
  blurb: string;
  role: string;
  period: string;
  /** Catalogue slugs from `skills.ts`. */
  stack: string[];
  links?: { label: string; href: string }[];
};

/**
 * Featured work, shared by every presentation. Membership in this array is
 * featuring — there is no `featured` flag — and the order is hand-curated.
 * Capped at three; there is no floor. All three are client work with nothing
 * public to link, so none of them carry `links`.
 */
export const featuredWork: readonly FeaturedProject[] = [
  {
    slug: "milktracker",
    title: "MilkTracker",
    blurb:
      "Rebuilt a neonatal milk-tracking app as one Angular and Ionic codebase across web, iOS and Android, replacing a legacy Objective-C app in 10 hospitals nationwide.",
    role: "Lead front-end developer, Angel Eye Health",
    period: "2020–2024",
    stack: ["angular", "ionic", "typescript", "rxjs", "jasmine"],
  },
  {
    slug: "blossom-groconnect",
    title: "Blossom / GroConnect",
    blurb:
      "Inherited a smart-irrigation controller app at acquisition, cut load time by over 70% for 20,000+ users, then unified the device family under one app.",
    role: "Lead mobile app developer, Scotts Miracle-Gro",
    period: "2017–2020",
    stack: ["ionic", "cordova", "angular", "typescript", "bitrise"],
  },
  {
    slug: "ai-education-platform",
    title: "AI education platform",
    blurb:
      "Ground-up Next.js build of an AI-integrated education platform, consulting from requirements and prioritisation through architecture and delivery.",
    role: "Lead developer, freelance",
    period: "2025–present",
    stack: ["nextjs", "react", "typescript", "tailwindcss"],
  },
];
