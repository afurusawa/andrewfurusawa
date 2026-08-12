import type { Metadata } from "next";

const unfurlTitle = "Andrew Furusawa · Neon Cyber Basement";
const unfurlDescription =
  "Nothing links here. You arrived by URL, which is the idea.";

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
