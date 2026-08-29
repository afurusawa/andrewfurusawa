"use client";

import { Suspense } from "react";
import PrototypeSwitcher, {
  usePrototypeVariant,
  VARIANT_META,
} from "./PrototypeSwitcher";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import VariantD from "./variants/VariantD";
import "./prototype.css";

/**
 * PROTOTYPE — homepage visual registers for the rebuilt public `/`.
 * Switch with ?variant=A|B|C|D or the floating bar (← →).
 *
 * A: Editorial Broadsheet — paper field, serif, numbered work index
 * B: Studio Grid — sticky nav, bento tiles, work cards, dark CTA block
 * C: Dossier Rail — fixed left rail, label/value rows, dense record
 * D: Poster Panels — no nav, full-height panels, accent field, inverse work
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
      {variant === "A" && <VariantA />}
      {variant === "B" && <VariantB />}
      {variant === "C" && <VariantC />}
      {variant === "D" && <VariantD />}
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
