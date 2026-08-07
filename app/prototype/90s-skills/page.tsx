import type { Metadata } from "next";
import PrototypeSwitcher from "./PrototypeSwitcher";
import {
  FONT_META,
  isFontKey,
  VARIANT_META,
  type FontKey,
  type VariantKey,
} from "./variants";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import { CATALOGUE, PUBLISH_SET } from "./stubCatalogue";
import "./prototype.css";

export const metadata: Metadata = {
  title: "PROTOTYPE: /90s skills directory",
  description:
    "Throwaway UI prototype exploring how the /90s Skills section presents the catalogue and its publish set.",
  robots: { index: false, follow: false },
};

/**
 * PROTOTYPE — /90s Skills section treatments.
 * Switch with ?variant=A|B|C or the floating bar (← →).
 *
 * The question under test: how does the hub's Skills section show the whole
 * catalogue when only a handful of skills have notes and are therefore links?
 *
 * A: period directory listing — one row per skill, STATUS column carries the split
 * B: tile wall grouped by category — tests whether `category` earns its place
 * C: publish set first as feature cards, full catalogue below as a dense run
 *
 * All three sit inside the same stage chrome from the shell prototype, so what
 * differs between them is the directory, not the frame.
 *
 * Rendered on the server (like the real SkillsSection) so the brand marks come
 * from the shared catalogue rather than a client bundle.
 */
export default async function Prototype90sSkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string; font?: string }>;
}) {
  const params = await searchParams;
  const raw = params.variant;
  const variant: VariantKey = raw === "B" || raw === "C" ? raw : "A";
  const font: FontKey = isFontKey(params.font) ? params.font : "pixel";

  return (
    <div className="p90-root" data-variant={variant} data-font={font}>
      <div className="p90-banner-note">
        PROTOTYPE — /90s Skills directory · variant {variant} (
        {VARIANT_META[variant]}) · type: {font} ({FONT_META[font]}) ·{" "}
        {CATALOGUE.length} skills, {PUBLISH_SET.length} with notes · ← → variant,
        ↑ ↓ type
      </div>
      <div style={{ paddingTop: "1.5rem", minHeight: "100%" }}>
        {variant === "A" && <VariantA />}
        {variant === "B" && <VariantB />}
        {variant === "C" && <VariantC />}
      </div>
      <PrototypeSwitcher current={variant} font={font} />
    </div>
  );
}
