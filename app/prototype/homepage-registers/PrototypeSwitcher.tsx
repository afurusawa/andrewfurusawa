"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ORDER,
  VARIANT_META,
  type SchemeKey,
  type VariantKey,
  isScheme,
  isVariant,
} from "./palettes";

export type PrototypeState = { variant: VariantKey; scheme: SchemeKey };

/**
 * Reads `?variant=` and `?scheme=` off `location` rather than via
 * `useSearchParams`, which suspends. Defaults: A, dark — the round is about
 * the dark values; light is the locked control.
 */
export function usePrototypeState(): PrototypeState {
  const [state, setState] = useState<PrototypeState>({ variant: "A", scheme: "dark" });

  useEffect(() => {
    function read() {
      const params = new URLSearchParams(window.location.search);
      const rawVariant = params.get("variant");
      const rawScheme = params.get("scheme");
      setState({
        variant: isVariant(rawVariant) ? rawVariant : "A",
        scheme: isScheme(rawScheme) ? rawScheme : "dark",
      });
    }
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  return state;
}

export default function PrototypeSwitcher({ current }: { current: PrototypeState }) {
  const go = useCallback((next: PrototypeState) => {
    const params = new URLSearchParams(window.location.search);
    params.set("variant", next.variant);
    params.set("scheme", next.scheme);
    window.history.replaceState(null, "", "?" + params.toString());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, []);

  const cycle = useCallback(
    (delta: number) => {
      const idx = ORDER.indexOf(current.variant);
      go({
        ...current,
        variant: ORDER[(idx + delta + ORDER.length) % ORDER.length],
      });
    },
    [current, go],
  );

  const toggleScheme = useCallback(() => {
    go({ ...current, scheme: current.scheme === "dark" ? "light" : "dark" });
  }, [current, go]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        cycle(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        cycle(1);
      } else if (e.key === "l" || e.key === "L" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        toggleScheme();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle, toggleScheme]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="phr-switcher" role="navigation" aria-label="Prototype palettes">
      <button type="button" aria-label="Previous palette" onClick={() => cycle(-1)}>
        ←
      </button>
      <span className="phr-switcher__label">
        {current.variant} — {VARIANT_META[current.variant]}
      </span>
      <button type="button" aria-label="Next palette" onClick={() => cycle(1)}>
        →
      </button>
      <button
        type="button"
        className="phr-switcher__scheme"
        aria-label={
          current.scheme === "dark" ? "Switch to locked light scheme" : "Switch to dark scheme"
        }
        onClick={toggleScheme}
      >
        {current.scheme === "dark" ? "dark" : "light"}
      </button>
    </div>
  );
}
