import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./experiment.css";
import { experimentFontClassName } from "./fonts";
import styles from "./nineties.module.css";
import { ninetiesMetadata } from "./metadata";

/**
 * Root layout of the experiment: its own `<html>` / `<body>`, its own face, and
 * no colour-scheme machinery at all. Entering `/90s` must not touch the stored
 * scheme choice, so nothing here reads or writes it.
 */

export const metadata = ninetiesMetadata;

export default function NinetiesRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={experimentFontClassName}>
      <body>
        <div className={styles.experiment}>{children}</div>
        <SpeedInsights />
      </body>
    </html>
  );
}
