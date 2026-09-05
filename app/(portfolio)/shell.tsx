import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { NEWSREADER_SRC, portfolioFontClassName } from "./fonts";
import { ThemeColorMeta, ThemeControl, ThemeRoot } from "./theme";

/**
 * The document shell of the modern presentation: `<html>` / `<body>`, the type
 * stack, and the colour-scheme provider.
 *
 * Keeping it separate makes the document shell reusable by the portfolio
 * route group and keeps the group layout focused on its route metadata.
 */
export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    // `next-themes` writes the class before paint, so the server markup and the
    // hydrated markup differ on `<html>` by design.
    <html lang="en" suppressHydrationWarning className={portfolioFontClassName}>
      <head>
        <link
          rel="preload"
          href={NEWSREADER_SRC}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeRoot>
          <ThemeColorMeta />
          <a href="#record" className="skip-link">
            Skip to content
          </a>
          <ThemeControl />
          {children}
          <SpeedInsights />
        </ThemeRoot>
      </body>
    </html>
  );
}
