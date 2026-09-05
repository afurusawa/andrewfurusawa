"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Colour-scheme plumbing for the modern presentation. The experiment ships
 * none of this: it has its own root layout, no provider, and no `.dark`.
 *
 * Light is the default and the first visit is always light, including when the
 * OS prefers dark — hence `enableSystem={false}`.
 */

/** Paper in each scheme, mirrored by the hand-written `theme-color` meta. */
export const PAPER_LIGHT = "#ffffff";
export const PAPER_DARK = "#0a0a0a";

export function ThemeRoot({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      enableColorScheme={true}
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  );
}

/**
 * `viewport.themeColor` keys to the OS, which is the wrong signal for a
 * scheme the visitor chose. Written by hand instead, light until hydrated so
 * the markup a no-JS visitor gets matches the scheme they get.
 */
export function ThemeColorMeta() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return <meta name="theme-color" content={isDark ? PAPER_DARK : PAPER_LIGHT} />;
}

export function ThemeControl() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  // Gated on `mounted` so the server and the first client render agree; the
  // control is invisible until then anyway.
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      // Hidden until hydrated so a visitor without JavaScript never meets a
      // dead control in the tab order.
      className={`themeControl${mounted ? " themeControl--ready" : ""}`}
      aria-label={
        isDark ? "Switch to light colour scheme" : "Switch to dark colour scheme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* Both icons are in the DOM; `.dark` picks which one shows. */}
      <svg
        className="themeControl__icon themeControl__icon--moon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
      </svg>
      <svg
        className="themeControl__icon themeControl__icon--sun"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5M19.1 4.9l-1.5 1.5M6.4 17.6l-1.5 1.5" />
      </svg>
    </button>
  );
}

/** True once the browser has taken over, so scheme-dependent output waits. */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
