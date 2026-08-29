"use client";

import PrototypeSwitcher, {
  usePrototypeVariant,
  VARIANT_META,
} from "./PrototypeSwitcher";
import VariantE from "./variants/VariantE";
import VariantG from "./variants/VariantG";
import VariantH from "./variants/VariantH";
import VariantI from "./variants/VariantI";
import VariantJ from "./variants/VariantJ";
import "./prototype.css";

/**
 * PROTOTYPE — homepage visual registers for the rebuilt public `/`.
 * Switch with ?variant=H|I|J|G|E or the floating bar (← →).
 *
 * WINNER: H. Chosen in round 3 and revised in round 4 — one lane chart for
 * "Recent work", more substance on the stage, credential moved into the
 * identity cluster, aligned "Where I help" numerals.
 *
 * Round 3 (E's typography + G's IA and colour + F's timeline, richer
 * content, portrait and CSPO credential added):
 * H: Loaded Stage    — G's side stage, loaded record, full colour cards on mobile
 * I: Portrait Ledger — no sticky chrome, portrait masthead, inverted timeline band
 * J: Sticky Marquee  — colour moves to a top marquee so content gets full width
 *
 * Kept from round 2 for comparison:
 * G: Split Stage — the IA these three are built on
 * E: Rail + Bands — the typographic range they borrow
 *
 * Retired: A, B (round 1) live at b820b8e; C (Dossier Rail, superseded),
 * D (Poster Panels) and F (Data Portrait, timeline kept in `timeline.ts`)
 * live at 2613dd1.
 */
export default function PrototypeHost() {
  const variant = usePrototypeVariant();

  return (
    <div data-variant={variant}>
      <div className="phr-banner">
        PROTOTYPE — not the real / route · stub copy pending the capabilities
        transcription · variant {variant} ({VARIANT_META[variant]}) · use the bar
        or ← →
      </div>
      {variant === "H" && <VariantH />}
      {variant === "I" && <VariantI />}
      {variant === "J" && <VariantJ />}
      {variant === "G" && <VariantG />}
      {variant === "E" && <VariantE />}
      <PrototypeSwitcher current={variant} />
    </div>
  );
}
