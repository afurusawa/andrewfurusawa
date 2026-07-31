import { Contrail_One, DM_Serif_Display, Spectral, VT323 } from "next/font/google";

// Only fonts used by the portfolio themes are loaded (light: DM Serif / Spectral /
// Contrail One; dark: VT323 / Contrail One). Unused families are omitted to keep
// font transfer within the lab budget without changing visual design.

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

const spectral = Spectral({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-spectral",
});

const contrailOne = Contrail_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-contrail-one",
});

export const fonts = {
  dmSerif,
  vt323,
  spectral,
  contrailOne,
};
