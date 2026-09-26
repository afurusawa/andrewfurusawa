import type { Metadata } from "next";
import { ARRIVED_LINE, SITE_NAME, homepageIdentity } from "./copy";

const unfurlTitle = `${SITE_NAME} · ${homepageIdentity.name}`;
const unfurlDescription = ARRIVED_LINE;

/** Layout metadata: robots and unfurl. Canonical lives on the hub page. */
export const ninetiesMetadata: Metadata = {
  title: unfurlTitle,
  description: unfurlDescription,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    title: unfurlTitle,
    description: unfurlDescription,
    images: [],
  },
  twitter: {
    card: "summary",
    title: unfurlTitle,
    description: unfurlDescription,
    images: [],
  },
};

/** Hub-page metadata so descendants do not inherit the hub canonical. */
export const ninetiesHubMetadata: Metadata = {
  alternates: {
    canonical: "/90s",
  },
};
