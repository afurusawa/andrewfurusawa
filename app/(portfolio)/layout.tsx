import type { ReactNode } from "react";
import type { Metadata } from "next";
import { PortfolioShell } from "./shell";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../config/site";

/**
 * Root layout of the modern presentation. The experiment has its own, with its
 * own `<html>` / `<body>` — that split is the isolation, so neither `/90s` nor
 * this route group can inherit the other's fonts, styles, or theme script.
 */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PortfolioRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <PortfolioShell>{children}</PortfolioShell>;
}
