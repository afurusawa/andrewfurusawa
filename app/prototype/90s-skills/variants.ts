export type VariantKey = "A" | "B" | "C";

export const VARIANT_META: Record<VariantKey, string> = {
  A: "Directory Listing",
  B: "Tile Wall by Category",
  C: "Notes First, Catalogue Below",
};

export const ORDER: VariantKey[] = ["A", "B", "C"];

/**
 * Legibility axis, orthogonal to the variant. VT323 is the /90s house face but
 * it is a low-legibility pixel font at reading sizes, so the prototype has to
 * be able to show the same treatment with the type dialled back.
 */
export type FontKey = "pixel" | "hybrid" | "mono";

export const FONT_META: Record<FontKey, string> = {
  pixel: "VT323 throughout (bigger, glow off)",
  hybrid: "VT323 chrome + mono content",
  mono: "Mono throughout, VT323 title only",
};

export const FONT_ORDER: FontKey[] = ["pixel", "hybrid", "mono"];

export const isFontKey = (v: string | undefined): v is FontKey =>
  v === "pixel" || v === "hybrid" || v === "mono";
