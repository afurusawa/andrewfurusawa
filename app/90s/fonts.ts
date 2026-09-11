import { Press_Start_2P, VT323 } from "next/font/google";

/**
 * The experiment's own faces, loaded from its own root layout so they never
 * count against the portfolio font budget. Press Start 2P is reserved for
 * the wordmark; VT323 is the short-label face.
 */

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-press-start",
});

export const experimentFonts = { vt323, pressStart };

/** The font variable classes, ready for the experiment root `<html>`. */
export const experimentFontClassName = Object.values(experimentFonts)
  .map((font) => font.variable)
  .join(" ");
