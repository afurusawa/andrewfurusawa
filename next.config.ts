import type { NextConfig } from "next";
import { pathHeaders } from "./app/config/securityHeaders";

const nextConfig: NextConfig = {
  async headers() {
    return [
      ...pathHeaders,
      {
        // Start the LCP serif with the document, before HTML parse queues JS.
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</fonts/newsreader-400-latin.woff2>; rel=preload; as=font; type="font/woff2"; crossorigin="anonymous"',
          },
        ],
      },
    ];
  },
  // Put CSS (and @font-face) in the document so LCP text does not wait on
  // two render-blocking stylesheets. next/font preload tags do not emit
  // from this app's font module, so discovery has to happen from the HTML.
  experimental: {
    inlineCss: true,
    // Unmatched URLs with multiple root layouts. See app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
