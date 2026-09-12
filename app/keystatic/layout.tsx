import type { ReactNode } from "react";
import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/**
 * Authoring UI root. Own `<html>` / `<body>` so the admin never inherits
 * portfolio or experiment chrome. Local mode only — production 404s.
 */
export const metadata: Metadata = {
  title: "Writing",
  robots: { index: false, follow: false },
};

export default function KeystaticRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
