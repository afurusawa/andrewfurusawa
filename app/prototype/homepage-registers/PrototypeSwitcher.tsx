"use client";

import { useCallback, useEffect, useState } from "react";

export type VariantKey = "H" | "I" | "J" | "G" | "E";

export const VARIANT_META: Record<VariantKey, string> = {
  H: "Loaded Stage",
  I: "Portrait Ledger",
  J: "Sticky Marquee",
  G: "Split Stage",
  E: "Rail + Bands",
};

const ORDER: VariantKey[] = ["H", "I", "J", "G", "E"];

function isVariant(v: string | null): v is VariantKey {
  return ORDER.includes(v as VariantKey);
}

/**
 * Reads `?variant=` straight off `location` rather than via `useSearchParams`,
 * which suspends and needs a `<Suspense>` boundary around the whole prototype.
 * A throwaway switcher does not need the router; this renders on the server as
 * the default and corrects itself on mount.
 */
export function usePrototypeVariant(): VariantKey {
  const [variant, setVariant] = useState<VariantKey>("H");

  useEffect(() => {
    function read() {
      const raw = new URLSearchParams(window.location.search).get("variant");
      setVariant(isVariant(raw) ? raw : "H");
    }
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return variant;
}

export default function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const go = useCallback((next: VariantKey) => {
    const params = new URLSearchParams(window.location.search);
    params.set("variant", next);
    window.history.replaceState(null, "", "?" + params.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const cycle = useCallback(
    (delta: number) => {
      const idx = ORDER.indexOf(current);
      go(ORDER[(idx + delta + ORDER.length) % ORDER.length]);
    },
    [current, go],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        cycle(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        cycle(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="phr-switcher" role="navigation" aria-label="Prototype variants">
      <button type="button" aria-label="Previous variant" onClick={() => cycle(-1)}>
        ←
      </button>
      <span className="phr-switcher__label">
        {current} — {VARIANT_META[current]}
      </span>
      <button type="button" aria-label="Next variant" onClick={() => cycle(1)}>
        →
      </button>
    </div>
  );
}
