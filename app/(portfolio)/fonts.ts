import { IBM_Plex_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * The portfolio type stack: four latin families at weight 400, no italics.
 * Fraunces is self-hosted because `next/font/google` cannot pin `wght` to 400
 * and keep the `opsz` axis; the cut here is latin, opsz 9..144 at wght 400.
 * Newsreader is self-hosted at `/fonts/newsreader-400-latin.woff2` so the serif
 * can be preloaded from a stable URL (next/font preload tags do not emit from
 * this app's font module).
 *
 * `preload: false` here so Inter, Fraunces, and Plex do not compete with that
 * Newsreader preload on the critical path.
 *
 * The experiment loads its own faces from its own root layout. Nothing here
 * reaches `/90s`.
 */

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

const fraunces = localFont({
  src: "./fonts/Fraunces-opsz-400-latin.woff2",
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
  declarations: [{ prop: "font-optical-sizing", value: "auto" }],
});

const plexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-plex-mono",
});

export const portfolioFonts = { inter, fraunces, plexMono };

/** Stable URL for the portfolio serif. Kept next to the preload in the document shell. */
export const NEWSREADER_SRC = "/fonts/newsreader-400-latin.woff2";

/** The font variable classes, ready for the portfolio root `<html>`. */
export const portfolioFontClassName = Object.values(portfolioFonts)
  .map((font) => font.variable)
  .join(" ");
