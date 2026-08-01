"use client";

import { Suspense } from "react";
import PrototypeSwitcher, {
  usePrototypeVariant,
  VARIANT_META,
} from "./PrototypeSwitcher";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import "./prototype.css";

/**
 * PROTOTYPE — three radically different /90s frames-feel shells.
 * Switch with ?variant=A|B|C or the floating bar (← →).
 *
 * A: classic left frame nav + content pane
 * B: top banner chrome + stacked cards
 * C: multi-pane collage + optional pack density
 */
function PrototypeInner() {
  const variant = usePrototypeVariant();

  return (
    <div className="p90-root" data-variant={variant}>
      <div className="p90-banner-note">
        PROTOTYPE — not the real /90s route · variant {variant} (
        {VARIANT_META[variant]}) · use bar or ← →
      </div>
      <div style={{ paddingTop: "1.5rem", minHeight: "100%" }}>
        {variant === "A" && <VariantA />}
        {variant === "B" && <VariantB />}
        {variant === "C" && <VariantC />}
      </div>
      <PrototypeSwitcher current={variant} />
    </div>
  );
}

export default function PrototypeHost() {
  return (
    <Suspense fallback={<div className="p90-root">Loading prototype…</div>}>
      <PrototypeInner />
    </Suspense>
  );
}
