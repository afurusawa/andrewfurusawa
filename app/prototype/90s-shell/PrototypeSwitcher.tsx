"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export type VariantKey = "A" | "B" | "C";

export const VARIANT_META: Record<VariantKey, string> = {
  A: "Left Frame Classic",
  B: "Top Banner Stack",
  C: "Multi-Pane Collage",
};

const ORDER: VariantKey[] = ["A", "B", "C"];

function isVariant(v: string | null): v is VariantKey {
  return v === "A" || v === "B" || v === "C";
}

export function usePrototypeVariant(): VariantKey {
  const searchParams = useSearchParams();
  const raw = searchParams.get("variant");
  return isVariant(raw) ? raw : "A";
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
      const next = ORDER[(idx + delta + ORDER.length) % ORDER.length];
      go(next);
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
    <div className="p90-switcher" role="navigation" aria-label="Prototype variants">
      <button type="button" aria-label="Previous variant" onClick={() => cycle(-1)}>
        ←
      </button>
      <span className="p90-switcher__label">
        {current} — {VARIANT_META[current]}
      </span>
      <button type="button" aria-label="Next variant" onClick={() => cycle(1)}>
        →
      </button>
    </div>
  );
}
