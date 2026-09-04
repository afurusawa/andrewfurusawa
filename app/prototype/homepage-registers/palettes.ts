/**
 * PROTOTYPE palettes for [Prototype the exact dark-scheme values for the
 * colour panel](https://github.com/afurusawa/andrewfurusawa/issues/80).
 *
 * Question: what are the exact dark-scheme colour values, seen on a screen
 * rather than computed? Layout is register H at 4e8a1ed — not a fifth register.
 *
 * Light is locked (#75 + #78): fields emerald-800 / blue-800 / amber-700 /
 * rose-800 / neutral-900; lanes teal-600 / indigo-500 / amber-600; paper white;
 * no opacity ladder. It is the control, not a variant.
 *
 * Dark variants (the decision):
 *   A Starting point — fields -300, lanes lifted (teal-500 / indigo-400 / amber-500)
 *   B Calmer tints  — fields -400, lanes lifted
 *   C Unlifted lanes — fields -300, light lane values on the dark track
 *   D/E/F Panel holds with a hued Recent work field (violet / cyan / fuchsia).
 *         Colour panel keeps the light fields and white ink; only the
 *         record/paper invert. Recent work is no longer neutral-900.
 *
 * Every class string is a complete Tailwind utility so the scanner sees it.
 */

export type VariantKey = "A" | "B" | "C" | "D" | "E" | "F";
export type SchemeKey = "light" | "dark";

export type StageTokens = {
  field: string;
  ink: string;
  recordGhost: string;
  ctaHover: string;
  accent: string;
  linkHover: string;
};

export type Palette = {
  key: VariantKey;
  scheme: SchemeKey;
  name: string;
  summary: string;
  paper: string;
  heading: string;
  body: string;
  muted: string;
  hairline: string;
  strongHairline: string;
  band: string;
  track: string;
  axis: string;
  chip: string;
  metricGrid: string;
  metricCell: string;
  panelInk: string;
  panelGhost: string;
  panelBorder: string;
  panelRule: string;
  panelRing: string;
  cta: string;
  lanes: [string, string, string];
  stages: [StageTokens, StageTokens, StageTokens, StageTokens, StageTokens];
};

export const VARIANT_META: Record<VariantKey, string> = {
  A: "Starting point",
  B: "Calmer tints",
  C: "Unlifted lanes",
  D: "Violet work",
  E: "Cyan work",
  F: "Fuchsia work",
};

/** Live cycle is the Recent work hue on the panel-holds chassis. */
export const ORDER: VariantKey[] = ["D", "E", "F"];

const LIGHT_STAGES: Palette["stages"] = [
  {
    field: "bg-emerald-800",
    ink: "text-emerald-800",
    recordGhost: "text-emerald-100",
    ctaHover: "hover:bg-white hover:text-emerald-800",
    accent: "border-emerald-800",
    linkHover: "hover:text-emerald-800",
  },
  {
    field: "bg-blue-800",
    ink: "text-blue-800",
    recordGhost: "text-blue-100",
    ctaHover: "hover:bg-white hover:text-blue-800",
    accent: "border-blue-800",
    linkHover: "hover:text-blue-800",
  },
  {
    field: "bg-neutral-900",
    ink: "text-neutral-900",
    recordGhost: "text-neutral-100",
    ctaHover: "hover:bg-white hover:text-neutral-900",
    accent: "border-neutral-900",
    linkHover: "hover:text-neutral-900",
  },
  {
    field: "bg-amber-700",
    ink: "text-amber-700",
    recordGhost: "text-amber-100",
    ctaHover: "hover:bg-white hover:text-amber-700",
    accent: "border-amber-700",
    linkHover: "hover:text-amber-700",
  },
  {
    field: "bg-rose-800",
    ink: "text-rose-800",
    recordGhost: "text-rose-100",
    ctaHover: "hover:bg-white hover:text-rose-800",
    accent: "border-rose-800",
    linkHover: "hover:text-rose-800",
  },
];

const LIGHT_CHROME = {
  paper: "bg-white",
  heading: "text-neutral-900",
  body: "text-neutral-700",
  muted: "text-neutral-500",
  hairline: "border-neutral-200",
  strongHairline: "border-neutral-900",
  band: "bg-neutral-50",
  track: "bg-neutral-200",
  axis: "border-neutral-900",
  chip: "border-neutral-300 text-neutral-600",
  metricGrid: "bg-neutral-200",
  metricCell: "bg-white",
  panelInk: "text-white",
  panelGhost: "text-white/[0.07]",
  panelBorder: "border-white/15",
  panelRule: "bg-white",
  panelRing: "ring-white/40",
  cta: "border-white",
  lanes: ["bg-teal-600", "bg-indigo-500", "bg-amber-600"] as [string, string, string],
};

const DARK_CHROME = {
  paper: "bg-neutral-950",
  heading: "text-neutral-100",
  body: "text-neutral-300",
  muted: "text-neutral-400",
  hairline: "border-neutral-800",
  strongHairline: "border-neutral-100",
  band: "bg-neutral-900",
  track: "bg-neutral-800",
  axis: "border-neutral-100",
  chip: "border-neutral-700 text-neutral-300",
  metricGrid: "bg-neutral-800",
  metricCell: "bg-neutral-950",
  panelInk: "text-neutral-900",
  panelGhost: "text-neutral-900/[0.07]",
  panelBorder: "border-neutral-900/15",
  panelRule: "bg-neutral-900",
  panelRing: "ring-neutral-900/40",
  cta: "border-neutral-900",
};

const DARK_300: Palette["stages"] = [
  {
    field: "bg-emerald-300",
    ink: "text-emerald-300",
    recordGhost: "text-emerald-950",
    ctaHover: "hover:bg-neutral-900 hover:text-emerald-300",
    accent: "border-emerald-300",
    linkHover: "hover:text-emerald-300",
  },
  {
    field: "bg-blue-300",
    ink: "text-blue-300",
    recordGhost: "text-blue-950",
    ctaHover: "hover:bg-neutral-900 hover:text-blue-300",
    accent: "border-blue-300",
    linkHover: "hover:text-blue-300",
  },
  {
    field: "bg-neutral-100",
    ink: "text-neutral-100",
    recordGhost: "text-neutral-950",
    ctaHover: "hover:bg-neutral-900 hover:text-neutral-100",
    accent: "border-neutral-100",
    linkHover: "hover:text-neutral-100",
  },
  {
    field: "bg-amber-300",
    ink: "text-amber-300",
    recordGhost: "text-amber-950",
    ctaHover: "hover:bg-neutral-900 hover:text-amber-300",
    accent: "border-amber-300",
    linkHover: "hover:text-amber-300",
  },
  {
    field: "bg-rose-300",
    ink: "text-rose-300",
    recordGhost: "text-rose-950",
    ctaHover: "hover:bg-neutral-900 hover:text-rose-300",
    accent: "border-rose-300",
    linkHover: "hover:text-rose-300",
  },
];

const DARK_400: Palette["stages"] = [
  {
    field: "bg-emerald-400",
    ink: "text-emerald-400",
    recordGhost: "text-emerald-950",
    ctaHover: "hover:bg-neutral-900 hover:text-emerald-400",
    accent: "border-emerald-400",
    linkHover: "hover:text-emerald-400",
  },
  {
    field: "bg-blue-400",
    ink: "text-blue-400",
    recordGhost: "text-blue-950",
    ctaHover: "hover:bg-neutral-900 hover:text-blue-400",
    accent: "border-blue-400",
    linkHover: "hover:text-blue-400",
  },
  {
    field: "bg-neutral-100",
    ink: "text-neutral-100",
    recordGhost: "text-neutral-950",
    ctaHover: "hover:bg-neutral-900 hover:text-neutral-100",
    accent: "border-neutral-100",
    linkHover: "hover:text-neutral-100",
  },
  {
    field: "bg-amber-400",
    ink: "text-amber-400",
    recordGhost: "text-amber-950",
    ctaHover: "hover:bg-neutral-900 hover:text-amber-400",
    accent: "border-amber-400",
    linkHover: "hover:text-amber-400",
  },
  {
    field: "bg-rose-400",
    ink: "text-rose-400",
    recordGhost: "text-rose-950",
    ctaHover: "hover:bg-neutral-900 hover:text-rose-400",
    accent: "border-rose-400",
    linkHover: "hover:text-rose-400",
  },
];

const LANES_LIFTED: [string, string, string] = [
  "bg-teal-500",
  "bg-indigo-400",
  "bg-amber-500",
];

const LANES_UNLIFTED: [string, string, string] = [
  "bg-teal-600",
  "bg-indigo-500",
  "bg-amber-600",
];

/** Panel = light fields + white ink; record ink lifts so it survives 950. */
const PANEL_HOLDS_STAGES: Palette["stages"] = [
  {
    field: "bg-emerald-800",
    ink: "text-emerald-300",
    recordGhost: "text-emerald-950",
    ctaHover: "hover:bg-white hover:text-emerald-800",
    accent: "border-emerald-300",
    linkHover: "hover:text-emerald-300",
  },
  {
    field: "bg-blue-800",
    ink: "text-blue-300",
    recordGhost: "text-blue-950",
    ctaHover: "hover:bg-white hover:text-blue-800",
    accent: "border-blue-300",
    linkHover: "hover:text-blue-300",
  },
  {
    field: "bg-neutral-900",
    ink: "text-neutral-100",
    recordGhost: "text-neutral-800",
    ctaHover: "hover:bg-white hover:text-neutral-900",
    accent: "border-neutral-100",
    linkHover: "hover:text-neutral-100",
  },
  {
    field: "bg-amber-700",
    ink: "text-amber-300",
    recordGhost: "text-amber-950",
    ctaHover: "hover:bg-white hover:text-amber-700",
    accent: "border-amber-300",
    linkHover: "hover:text-amber-300",
  },
  {
    field: "bg-rose-800",
    ink: "text-rose-300",
    recordGhost: "text-rose-950",
    ctaHover: "hover:bg-white hover:text-rose-800",
    accent: "border-rose-300",
    linkHover: "hover:text-rose-300",
  },
];

function withWork(base: Palette["stages"], work: StageTokens): Palette["stages"] {
  return [base[0], base[1], work, base[3], base[4]];
}

type WorkHue = "violet" | "cyan" | "fuchsia";

const WORK_DARK: Record<WorkHue, StageTokens> = {
  violet: {
    field: "bg-violet-800",
    ink: "text-violet-300",
    recordGhost: "text-violet-950",
    ctaHover: "hover:bg-white hover:text-violet-800",
    accent: "border-violet-300",
    linkHover: "hover:text-violet-300",
  },
  cyan: {
    field: "bg-cyan-800",
    ink: "text-cyan-300",
    recordGhost: "text-cyan-950",
    ctaHover: "hover:bg-white hover:text-cyan-800",
    accent: "border-cyan-300",
    linkHover: "hover:text-cyan-300",
  },
  fuchsia: {
    field: "bg-fuchsia-800",
    ink: "text-fuchsia-300",
    recordGhost: "text-fuchsia-950",
    ctaHover: "hover:bg-white hover:text-fuchsia-800",
    accent: "border-fuchsia-300",
    linkHover: "hover:text-fuchsia-300",
  },
};

const WORK_LIGHT: Record<WorkHue, StageTokens> = {
  violet: {
    field: "bg-violet-800",
    ink: "text-violet-800",
    recordGhost: "text-violet-100",
    ctaHover: "hover:bg-white hover:text-violet-800",
    accent: "border-violet-800",
    linkHover: "hover:text-violet-800",
  },
  cyan: {
    field: "bg-cyan-800",
    ink: "text-cyan-800",
    recordGhost: "text-cyan-100",
    ctaHover: "hover:bg-white hover:text-cyan-800",
    accent: "border-cyan-800",
    linkHover: "hover:text-cyan-800",
  },
  fuchsia: {
    field: "bg-fuchsia-800",
    ink: "text-fuchsia-800",
    recordGhost: "text-fuchsia-100",
    ctaHover: "hover:bg-white hover:text-fuchsia-800",
    accent: "border-fuchsia-800",
    linkHover: "hover:text-fuchsia-800",
  },
};

const WORK_VARIANT: Partial<Record<VariantKey, WorkHue>> = {
  D: "violet",
  E: "cyan",
  F: "fuchsia",
};

function panelHolds(work: StageTokens, key: VariantKey, name: string, summary: string): Palette {
  return {
    key,
    scheme: "dark",
    name,
    summary,
    ...DARK_CHROME,
    panelInk: LIGHT_CHROME.panelInk,
    panelGhost: LIGHT_CHROME.panelGhost,
    panelBorder: LIGHT_CHROME.panelBorder,
    panelRule: LIGHT_CHROME.panelRule,
    panelRing: LIGHT_CHROME.panelRing,
    cta: LIGHT_CHROME.cta,
    lanes: LANES_LIFTED,
    stages: withWork(PANEL_HOLDS_STAGES, work),
  };
}

export const LIGHT: Palette = {
  key: "A",
  scheme: "light",
  name: "Locked light",
  summary: "fields 800/700 · lanes unlifted · paper white · no opacity",
  ...LIGHT_CHROME,
  stages: LIGHT_STAGES,
};

export const DARK: Record<VariantKey, Palette> = {
  A: {
    key: "A",
    scheme: "dark",
    name: "Starting point",
    summary: "fields -300 · lanes lifted · paper 950 · no opacity",
    ...DARK_CHROME,
    lanes: LANES_LIFTED,
    stages: DARK_300,
  },
  B: {
    key: "B",
    scheme: "dark",
    name: "Calmer tints",
    summary: "fields -400 · lanes lifted · paper 950 · no opacity",
    ...DARK_CHROME,
    lanes: LANES_LIFTED,
    stages: DARK_400,
  },
  C: {
    key: "C",
    scheme: "dark",
    name: "Unlifted lanes",
    summary: "fields -300 · lanes unlifted · paper 950 · no opacity",
    ...DARK_CHROME,
    lanes: LANES_UNLIFTED,
    stages: DARK_300,
  },
  D: panelHolds(
    WORK_DARK.violet,
    "D",
    "Violet work",
    "panel holds · Recent work violet-800 · lanes lifted",
  ),
  E: panelHolds(
    WORK_DARK.cyan,
    "E",
    "Cyan work",
    "panel holds · Recent work cyan-800 · lanes lifted",
  ),
  F: panelHolds(
    WORK_DARK.fuchsia,
    "F",
    "Fuchsia work",
    "panel holds · Recent work fuchsia-800 · lanes lifted",
  ),
};

export function resolvePalette(variant: VariantKey, scheme: SchemeKey): Palette {
  const hue = WORK_VARIANT[variant];
  if (scheme === "light") {
    if (!hue) return { ...LIGHT, key: variant };
    return {
      ...LIGHT,
      key: variant,
      name: VARIANT_META[variant],
      summary: "light · Recent work " + hue + "-800 · rest locked",
      stages: withWork(LIGHT_STAGES, WORK_LIGHT[hue]),
    };
  }
  return DARK[variant];
}

export function isVariant(v: string | null): v is VariantKey {
  return v != null && v in VARIANT_META;
}

export function isScheme(v: string | null): v is SchemeKey {
  return v === "light" || v === "dark";
}
