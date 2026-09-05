import type { ReactNode } from "react";
import "../globals.css";

/**
 * PROTOTYPE root layout. Throwaway routes render their own `<html>` / `<body>`
 * rather than borrowing a presentation's — the modern root would hand them a
 * theme provider and a theme control they are not testing.
 */

export default function PrototypeRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
