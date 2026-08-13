// Draws the /90s hub kitsch pack into public/90s/.
//
// The pack is hub-only theater: one wide under-construction tape strip and
// exactly three 88x31 badges. Every asset is a single static frame, and the
// whole pack must stay under 40KB uncompressed on disk.
//
// The badges are drawn here rather than sourced so their provenance is this
// repository — no hotlinks, no stock licence to track. Run with:
//
//   node scripts/generate-90s-pack.mjs

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "90s");

const BADGE_WIDTH = 88;
const BADGE_HEIGHT = 31;

// A 5x7 pixel face, the period-correct size for an 88x31. Only the glyphs the
// three badges need are cut.
const GLYPHS = {
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
  O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "%": ["11001", "11010", "00010", "00100", "01000", "01011", "10011"],
  "♥": ["01010", "11111", "11111", "11111", "01110", "00100", "00000"],
};

const GLYPH_WIDTH = 5;
const GLYPH_HEIGHT = 7;

function hexToRgb(hex) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function createCanvas(width, height, fill) {
  const pixels = new Uint8Array(width * height * 3);
  const [r, g, b] = hexToRgb(fill);

  for (let index = 0; index < width * height; index += 1) {
    pixels[index * 3] = r;
    pixels[index * 3 + 1] = g;
    pixels[index * 3 + 2] = b;
  }

  return { width, height, pixels };
}

function setPixel(canvas, x, y, hex) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;

  const [r, g, b] = hexToRgb(hex);
  const offset = (y * canvas.width + x) * 3;

  canvas.pixels[offset] = r;
  canvas.pixels[offset + 1] = g;
  canvas.pixels[offset + 2] = b;
}

function fillRect(canvas, x, y, width, height, hex) {
  for (let row = y; row < y + height; row += 1) {
    for (let column = x; column < x + width; column += 1) {
      setPixel(canvas, column, row, hex);
    }
  }
}

function lineWidth(text, scale) {
  return text.length * (GLYPH_WIDTH + 1) * scale - scale;
}

function drawLine(canvas, text, colors, defaultColor, top, scale) {
  const left = Math.round((canvas.width - lineWidth(text, scale)) / 2);

  [...text].forEach((character, index) => {
    const glyph = GLYPHS[character];
    if (!glyph) throw new Error(`No glyph cut for ${JSON.stringify(character)}`);

    const color = colors[index] ?? defaultColor;
    const originX = left + index * (GLYPH_WIDTH + 1) * scale;

    glyph.forEach((row, rowIndex) => {
      [...row].forEach((bit, columnIndex) => {
        if (bit !== "1") return;

        fillRect(
          canvas,
          originX + columnIndex * scale,
          top + rowIndex * scale,
          scale,
          scale,
          color,
        );
      });
    });
  });
}

// Classic 88x31 chrome: a hard black edge over a one-pixel silver bevel.
function drawBevel(canvas, { light, dark }) {
  const lastX = canvas.width - 1;
  const lastY = canvas.height - 1;

  fillRect(canvas, 0, 0, canvas.width, 1, "#000000");
  fillRect(canvas, 0, lastY, canvas.width, 1, "#000000");
  fillRect(canvas, 0, 0, 1, canvas.height, "#000000");
  fillRect(canvas, lastX, 0, 1, canvas.height, "#000000");

  fillRect(canvas, 1, 1, canvas.width - 2, 1, light);
  fillRect(canvas, 1, 1, 1, canvas.height - 2, light);
  fillRect(canvas, 1, lastY - 1, canvas.width - 2, 1, dark);
  fillRect(canvas, lastX - 1, 1, 1, canvas.height - 2, dark);
}

function drawBadge({ topLine, topColors, topColor, bottomLine, bottomColor, background, bevel }) {
  const canvas = createCanvas(BADGE_WIDTH, BADGE_HEIGHT, background);

  drawBevel(canvas, bevel);

  const topHeight = GLYPH_HEIGHT;
  const bottomHeight = GLYPH_HEIGHT * 2;
  const gap = 3;
  const top = Math.round((BADGE_HEIGHT - (topHeight + gap + bottomHeight)) / 2);

  drawLine(canvas, topLine, topColors ?? {}, topColor, top, 1);
  drawLine(canvas, bottomLine, {}, bottomColor, top + topHeight + gap, 2);

  return canvas;
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);

  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(body));

  return Buffer.concat([length, body, checksum]);
}

function encodePng({ width, height, pixels }) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // truecolour
  header[10] = 0; // deflate
  header[11] = 0; // adaptive filtering
  header[12] = 0; // no interlace

  const stride = width * 3;
  const raw = Buffer.alloc(height * (stride + 1));

  for (let row = 0; row < height; row += 1) {
    raw[row * (stride + 1)] = 0; // filter: none
    Buffer.from(pixels.subarray(row * stride, (row + 1) * stride)).copy(
      raw,
      row * (stride + 1) + 1,
    );
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const badges = [
  {
    file: "badge-html.png",
    topLine: "I ♥",
    topColors: { 2: "#ff3b6b" },
    topColor: "#f2f2f2",
    bottomLine: "HTML",
    bottomColor: "#ff3b6b",
    background: "#141420",
    bevel: { light: "#d0d0d8", dark: "#4a4a55" },
  },
  {
    file: "badge-cool.png",
    topLine: "100%",
    topColor: "#7fdfff",
    bottomLine: "COOL",
    bottomColor: "#ffd700",
    background: "#002b55",
    bevel: { light: "#cfe6ff", dark: "#00172e" },
  },
  {
    file: "badge-hack.png",
    topLine: "HACK THE",
    topColor: "#ff00ff",
    bottomLine: "PLANET",
    bottomColor: "#00ff66",
    background: "#1a0011",
    bevel: { light: "#ffb3ff", dark: "#450033" },
  },
];

// Wide hazard tape. Single frame: no SMIL, no CSS animation inside the asset.
const TAPE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 44" width="480" height="44">
  <defs>
    <pattern id="hazard" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="28" height="28" fill="#ffcc00"/>
      <rect width="14" height="28" fill="#141414"/>
    </pattern>
  </defs>
  <rect width="480" height="44" fill="url(#hazard)"/>
  <rect y="11" width="480" height="22" fill="#0a0a0a"/>
  <rect y="10" width="480" height="1" fill="#ffcc00"/>
  <rect y="33" width="480" height="1" fill="#ffcc00"/>
  <text x="238" y="28" fill="#ffcc00" font-family="Impact, Haettenschweiler, 'Arial Narrow Bold', 'Arial Black', sans-serif" font-size="16" letter-spacing="4" text-anchor="middle">UNDER CONSTRUCTION</text>
</svg>
`;

mkdirSync(OUT_DIR, { recursive: true });

const written = badges.map((badge) => {
  const bytes = encodePng(drawBadge(badge));
  writeFileSync(join(OUT_DIR, badge.file), bytes);
  return [badge.file, bytes.length];
});

writeFileSync(join(OUT_DIR, "under-construction.svg"), TAPE);
written.push(["under-construction.svg", Buffer.byteLength(TAPE)]);

const total = written.reduce((sum, [, size]) => sum + size, 0);

for (const [file, size] of written) {
  console.log(`${file.padEnd(24)} ${size} bytes`);
}
console.log(`${"pack total".padEnd(24)} ${total} bytes (budget 40960)`);

if (total > 40960) {
  throw new Error(`Pack is ${total} bytes, over the 40KB budget`);
}
