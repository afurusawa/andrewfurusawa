import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { identity } from "../config/homepage";
import { SITE_NAME, SITE_TITLE } from "../config/site";

/**
 * Built share card for `/`. One static Recent work field (`violet-900`),
 * always dark. Satori cannot take the self-hosted Fraunces woff2, so this
 * file pins static latin woff cuts beside it.
 */

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Tailwind `violet-900` — the Recent work colour-panel field. */
const FIELD = "#4c1d95";

const here = join(process.cwd(), "app", "(portfolio)");

export default async function Image() {
  const [fraunces, plexMono, portrait] = await Promise.all([
    readFile(join(here, "fonts", "Fraunces-og-400-latin.woff")),
    readFile(join(here, "fonts", "IBMPlexMono-og-400-latin.woff")),
    readFile(join(here, "share-portrait.jpg")),
  ]);
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: FIELD,
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "48px",
            bottom: "-72px",
            display: "flex",
            fontFamily: "Fraunces",
            fontSize: 420,
            lineHeight: 1,
            color: "rgba(255, 255, 255, 0.07)",
          }}
        >
          03
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            position: "relative",
          }}
        >
          <img
            src={portraitSrc}
            width={160}
            height={160}
            alt=""
            style={{
              width: 160,
              height: 160,
              borderRadius: 9999,
              objectFit: "cover",
              border: "4px solid rgba(255, 255, 255, 0.4)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Fraunces",
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 12,
                fontFamily: "IBM Plex Mono",
                fontSize: 22,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {identity.line}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Fraunces",
          data: fraunces,
          style: "normal",
          weight: 400,
        },
        {
          name: "IBM Plex Mono",
          data: plexMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
