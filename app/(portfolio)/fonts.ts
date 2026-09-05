import { IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import localFont from "next/font/local";

/**
 * The portfolio type stack: four latin families at weight 400, no italics.
 * Fraunces is self-hosted because `next/font/google` cannot pin `wght` to 400
 * and keep the `opsz` axis; the cut here is latin, opsz 9..144 at wght 400.
 *
 * The experiment loads its own faces from its own root layout. Nothing here
 * reaches `/90s`.
 */

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const newsreader = Newsreader({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

const fraunces = localFont({
  src: "./fonts/Fraunces-opsz-400-latin.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-fraunces",
  declarations: [{ prop: "font-optical-sizing", value: "auto" }],
});

const plexMono = IBM_Plex_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const portfolioFonts = { inter, newsreader, fraunces, plexMono };

/** The font variable classes, ready for the portfolio root `<html>`. */
export const portfolioFontClassName = Object.values(portfolioFonts)
  .map((font) => font.variable)
  .join(" ");
