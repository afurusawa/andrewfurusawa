"use client";

import { Suspense } from "react";
import PrototypeSwitcher, {
  usePrototypeVariant,
  VARIANT_META,
} from "./PrototypeSwitcher";
import VariantC from "./variants/VariantC";
import VariantD from "./variants/VariantD";
import VariantE from "./variants/VariantE";
import VariantF from "./variants/VariantF";
import VariantG from "./variants/VariantG";
import "./prototype.css";

/**
 * PROTOTYPE — homepage visual registers for the rebuilt public `/`.
 * Switch with ?variant=C|D|E|F|G or the floating bar (← →).
 *
 * Round 1 survivors:
 * C: Dossier Rail — fixed left rail, label/value rows, dense record
 * D: Poster Panels — no nav, full-height panels, accent field, inverse work
 *
 * Round 2 (C-density + D-chroma, no dead space):
 * E: Rail + Bands — C rail, right column split into full-bleed colour bands
 * F: Data Portrait — timeline, outcome numerals, tinted offer matrix
 * G: Split Stage — sticky colour stage repaints per section beside a dense record
 *
 * A (Editorial Broadsheet) and B (Studio Grid) were retired after round 1;
 * they live in history at commit b820b8e.
 */
function PrototypeInner() {
  const variant = usePrototypeVariant();

  return (
    <div data-variant={variant}>
      <div className="phr-banner">
        PROTOTYPE — not the real / route · stub copy pending the capabilities
        transcription · variant {variant} ({VARIANT_META[variant]}) · use the bar
        or ← →
      </div>
      {variant === "C" && <VariantC />}
      {variant === "D" && <VariantD />}
      {variant === "E" && <VariantE />}
      {variant === "F" && <VariantF />}
      {variant === "G" && <VariantG />}
      <PrototypeSwitcher current={variant} />
    </div>
  );
}

export default function PrototypeHost() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem" }}>Loading prototype…</div>}>
      <PrototypeInner />
    </Suspense>
  );
}
