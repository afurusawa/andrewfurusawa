"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export type VariantKey = "C" | "D" | "E" | "F" | "G";

export const VARIANT_META: Record<VariantKey, string> = {
  C: "Dossier Rail",
  D: "Poster Panels",
  E: "Rail + Bands",
  F: "Data Portrait",
  G: "Split Stage",
};

const ORDER: VariantKey[] = ["C", "D", "E", "F", "G"];

function isVariant(v: string | null): v is VariantKey {
  return ORDER.includes(v as VariantKey);
}

export function usePrototypeVariant(): VariantKey {
  const searchParams = useSearchParams();
  const raw = searchParams.get("variant");
  return isVariant(raw) ? raw : "C";
}

export default function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const go = useCallback(
    (next: VariantKey) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("variant", next);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

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
