import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Andrew Furusawa /90s",
  description: "A private portfolio experiment by Andrew Furusawa.",
  alternates: {
    canonical: "/90s",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NinetiesLayout({ children }: { children: ReactNode }) {
  return children;
}
