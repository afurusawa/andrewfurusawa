"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { ORDER, VARIANT_META, type VariantKey } from "./variants";

/**
 * The variant lives in the URL and is read on the server, so this island only
 * has to move between links — no client-side variant state.
 */
export default function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const router = useRouter();
  const idx = ORDER.indexOf(current);
  const prev = ORDER[(idx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(idx + 1) % ORDER.length];

  const cycle = useCallback(
    (to: VariantKey) => router.replace(`?variant=${to}`, { scroll: false }),
    [router],
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
        cycle(prev);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        cycle(next);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle, prev, next]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="p90-switcher" role="navigation" aria-label="Prototype variants">
      <Link href={`?variant=${prev}`} scroll={false} aria-label="Previous variant">
        ←
      </Link>
      <span className="p90-switcher__label">
        {current} — {VARIANT_META[current]}
      </span>
      <Link href={`?variant=${next}`} scroll={false} aria-label="Next variant">
        →
      </Link>
    </div>
  );
}
