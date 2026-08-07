export type VariantKey = "A" | "B" | "C";

export const VARIANT_META: Record<VariantKey, string> = {
  A: "Directory Listing",
  B: "Tile Wall by Category",
  C: "Notes First, Catalogue Below",
};

export const ORDER: VariantKey[] = ["A", "B", "C"];
