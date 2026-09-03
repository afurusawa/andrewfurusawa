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
 *
 * Every class string is a complete Tailwind utility so the scanner sees it.
 */

export type VariantKey = "A" | "B" | "C";
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
};

export const ORDER: VariantKey[] = ["A", "B", "C"];

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
};

export function resolvePalette(variant: VariantKey, scheme: SchemeKey): Palette {
  if (scheme === "light") {
    return { ...LIGHT, key: variant };
  }
  return DARK[variant];
}

export function isVariant(v: string | null): v is VariantKey {
  return ORDER.includes(v as VariantKey);
}

export function isScheme(v: string | null): v is SchemeKey {
  return v === "light" || v === "dark";
}
