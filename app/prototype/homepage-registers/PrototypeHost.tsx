"use client";

import PrototypeSwitcher, { usePrototypeState } from "./PrototypeSwitcher";
import { resolvePalette } from "./palettes";
import VariantH from "./variants/VariantH";
import "./prototype.css";

/**
 * PROTOTYPE — exact dark-scheme values for the colour panel, on register H.
 * Switch palettes with ?variant=D|A|B|C or ← →. Toggle the locked light
 * control with ?scheme=light|dark, the scheme button, or L / D.
 *
 * D: Panel holds    (light fields + white ink; record inverts)
 * A: Starting point (fields -300, lanes lifted)
 * B: Calmer tints   (fields -400, lanes lifted)
 * C: Unlifted lanes (fields -300, light lane values)
 */

export default function PrototypeHost() {
  const { variant, scheme } = usePrototypeState();
  const palette = resolvePalette(variant, scheme);

  return (
    <div data-variant={variant} data-scheme={scheme}>
      <div className="phr-banner">
        <div>
          PROTOTYPE — palette round on H ·{" "}
          {scheme === "light"
            ? "locked light (control) · " + variant + " waiting in dark"
            : palette.name}{" "}
          · {palette.summary}
        </div>
        <div className="phr-swatches" aria-hidden>
          {palette.stages.map(s => (
            <span key={s.field} className={s.field} />
          ))}
          <i />
          {palette.lanes.map(lane => (
            <span key={lane} className={lane} />
          ))}
        </div>
      </div>
      <VariantH key={scheme + palette.panelInk} palette={palette} />
      <PrototypeSwitcher current={{ variant, scheme }} />
    </div>
  );
}
