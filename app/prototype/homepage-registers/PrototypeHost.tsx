"use client";

import PrototypeSwitcher, { usePrototypeState } from "./PrototypeSwitcher";
import { resolvePalette } from "./palettes";
import VariantH from "./variants/VariantH";
import "./prototype.css";

/**
 * PROTOTYPE — exact dark-scheme values for the colour panel, on register H.
 * Switch palettes with ?variant=D|E|F or ← →. Toggle scheme with the
 * button or L / D. D/E/F are panel-holds with a hued Recent work field.
 */

export default function PrototypeHost() {
  const { variant, scheme } = usePrototypeState();
  const palette = resolvePalette(variant, scheme);

  return (
    <div data-variant={variant} data-scheme={scheme}>
      <div className="phr-banner">
        <div>
          PROTOTYPE — palette round on H ·{" "}
          {palette.name} · {scheme} · {palette.summary}
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
