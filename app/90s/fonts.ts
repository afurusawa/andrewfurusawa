import { VT323 } from "next/font/google";

/**
 * The experiment's own face, loaded from its own root layout so it never
 * counts against the portfolio font budget. The Impact-class display face is
 * a local system stack declared in `nineties.module.css`, not a web font.
 */

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

export const experimentFonts = { vt323 };

/** The font variable classes, ready for the experiment root `<html>`. */
export const experimentFontClassName = Object.values(experimentFonts)
  .map((font) => font.variable)
  .join(" ");
