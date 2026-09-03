import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import PrototypeHost from "./PrototypeHost";

/**
 * PROTOTYPE route — dark-scheme palettes on register H, switchable via
 * `?variant=A|B|C` and `?scheme=dark|light`. Fonts are loaded here (server
 * component) and exposed as CSS variables. Throwaway: see README.md.
 */

const inter = Inter({ subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], display: "swap" });
const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PROTOTYPE: colour-panel dark values",
  description:
    "Throwaway UI prototype of dark-scheme palettes on the Loaded Stage register.",
  robots: { index: false, follow: false },
};

export default function HomepageRegistersPrototypePage() {
  return (
    <div
      style={
        {
          "--phr-sans": inter.style.fontFamily,
          "--phr-serif": newsreader.style.fontFamily,
          "--phr-display": fraunces.style.fontFamily,
          "--phr-mono": plexMono.style.fontFamily,
        } as React.CSSProperties
      }
    >
      <PrototypeHost />
    </div>
  );
}
