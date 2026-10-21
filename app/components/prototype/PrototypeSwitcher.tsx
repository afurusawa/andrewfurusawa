"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import styles from "./PrototypeSwitcher.module.css";

/** Shared, throwaway UI comparison control. URL state only; no persistence. */
export function PrototypeSwitcher({
  current,
  variants,
}: {
  current: string;
  variants: readonly { key: string; name: string; description: string; structure: string; mobile: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = variants.findIndex((variant) => variant.key === current);
  const selected = variants[index];

  const cycle = useCallback((delta: number) => {
    const next = variants[(index + delta + variants.length) % variants.length];
    const params = new URLSearchParams(searchParams.toString());
    params.set("variant", next.key);
    router.replace(`?${params.toString()}`, { scroll: true });
    window.scrollTo(0, 0);
  }, [index, router, searchParams, variants]);

  useEffect(() => {
    console.info("Homepage prototype state", { ...selected, writing: "Hidden until a substantive post is ready", persistence: "URL only" });
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]") || event.altKey || event.metaKey || event.ctrlKey) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        cycle(event.key === "ArrowLeft" ? -1 : 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle, selected]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <nav className={styles.bar} aria-label="Prototype variants">
      <button onClick={() => cycle(-1)} aria-label="Previous variant">←</button>
      <div className={styles.label} aria-live="polite" aria-atomic="true">
        <span className={styles.eyebrow}>Prototype · {index + 1} of {variants.length}</span>
        <span>{current} — {selected.name}</span>
      </div>
      <button onClick={() => cycle(1)} aria-label="Next variant">→</button>
    </nav>
  );
}
