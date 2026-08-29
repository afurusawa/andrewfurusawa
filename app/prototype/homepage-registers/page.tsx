import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter, Newsreader } from "next/font/google";
import PrototypeHost from "./PrototypeHost";

/**
 * PROTOTYPE route — five homepage visual registers, switchable via
 * `?variant=H|I|J|G|E`. Fonts are loaded here (server component) and exposed to
 * the variants as CSS variables; none of these families are committed to
 * anything yet. Throwaway: see README.md.
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
  title: "PROTOTYPE: homepage visual registers",
  description:
    "Throwaway UI prototype exploring visual registers for the rebuilt public homepage.",
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
