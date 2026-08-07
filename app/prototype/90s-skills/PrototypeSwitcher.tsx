"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import {
  FONT_ORDER,
  ORDER,
  VARIANT_META,
  type FontKey,
  type VariantKey,
} from "./variants";

/**
 * Both axes live in the URL and are read on the server, so this island only has
 * to move between links — no client-side state.
 *
 * ← → cycles the treatment, ↑ ↓ cycles the typeface, and the two are
 * independent so a treatment can be judged separately from its legibility.
 */
export default function PrototypeSwitcher({
  current,
  font,
}: {
  current: VariantKey;
  font: FontKey;
}) {
  const router = useRouter();

  const vIdx = ORDER.indexOf(current);
  const prev = ORDER[(vIdx - 1 + ORDER.length) % ORDER.length];
  const next = ORDER[(vIdx + 1) % ORDER.length];

  const fIdx = FONT_ORDER.indexOf(font);
  const fontPrev = FONT_ORDER[(fIdx - 1 + FONT_ORDER.length) % FONT_ORDER.length];
  const fontNext = FONT_ORDER[(fIdx + 1) % FONT_ORDER.length];

  const href = (v: VariantKey, f: FontKey) => `?variant=${v}&font=${f}`;

  const go = useCallback(
    (to: string) => router.replace(to, { scroll: false }),
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
      const moves: Record<string, string | undefined> = {
        ArrowLeft: href(prev, font),
        ArrowRight: href(next, font),
        ArrowUp: href(current, fontPrev),
        ArrowDown: href(current, fontNext),
      };
      const to = moves[e.key];
      if (to) {
        e.preventDefault();
        go(to);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, prev, next, fontPrev, fontNext, current, font]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="p90-switcher" role="navigation" aria-label="Prototype variants">
      <Link href={href(prev, font)} scroll={false} aria-label="Previous variant">
        ←
      </Link>
      <span className="p90-switcher__label">
        {current} — {VARIANT_META[current]}
      </span>
      <Link href={href(next, font)} scroll={false} aria-label="Next variant">
        →
      </Link>
      <span className="p90-switcher__sep" aria-hidden="true" />
      <span className="p90-switcher__group">
        {FONT_ORDER.map((f) => (
          <Link
            key={f}
            href={href(current, f)}
            scroll={false}
            className={f === font ? "is-active" : undefined}
            aria-current={f === font ? "true" : undefined}
          >
            {f}
          </Link>
        ))}
      </span>
    </div>
  );
}
