// Stamps a "fictional data" label on every Flash Contrôle Routier screenshot.
// The records shown were generated for the demo, so nothing is masked: the
// label keeps that clear even when a capture is viewed outside the portfolio.
//
// Unlabelled sources are kept in .private-originals/ (git-ignored), so the
// script can be re-run without stacking labels. On first run the current
// public captures are copied there.
import { access, copyFile, mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "public/images/flash-controle-routier/captures");
const originalsDir = path.join(root, ".private-originals/flash-controle-routier/captures");

const LABEL = "DONNÉES FICTIVES";
const FONT = "Segoe UI, Arial, sans-serif";
const FONT_SIZE = 24;
const HEIGHT = 50;
const PADDING = 22;
const ICON = 26;
const MARGIN = 24;

const exists = (file) => access(file).then(() => true, () => false);

async function textWidth() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${HEIGHT}"><text x="0" y="34" font-family="${FONT}" font-size="${FONT_SIZE}" font-weight="700" letter-spacing="1.5">${LABEL}</text></svg>`;
  const { info } = await sharp(Buffer.from(svg)).trim().toBuffer({ resolveWithObject: true });
  return info.width;
}

function labelSvg(width, height, labelText) {
  const labelWidth = PADDING + ICON + 12 + labelText + PADDING;
  const x = width - MARGIN - labelWidth;
  const y = height - MARGIN - HEIGHT;
  const iconX = x + PADDING + ICON / 2;
  const centerY = y + HEIGHT / 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><filter id="shadow" x="-20%" y="-50%" width="140%" height="200%"><feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0b1324" flood-opacity=".35"/></filter></defs>
    <rect x="${x}" y="${y}" width="${labelWidth}" height="${HEIGHT}" rx="${HEIGHT / 2}" fill="#f59e0b" stroke="#0b1324" stroke-opacity=".18" filter="url(#shadow)"/>
    <circle cx="${iconX}" cy="${centerY}" r="${ICON / 2}" fill="#0b1324"/>
    <text x="${iconX}" y="${centerY + 7}" text-anchor="middle" font-family="${FONT}" font-size="20" font-weight="700" fill="#f59e0b">i</text>
    <text x="${x + PADDING + ICON + 12}" y="${centerY + 8.5}" font-family="${FONT}" font-size="${FONT_SIZE}" font-weight="700" letter-spacing="1.5" fill="#0b1324">${LABEL}</text>
  </svg>`);
}

const files = [
  ...(await readdir(publicDir)).filter((file) => file.endsWith(".png")),
  ...(await readdir(path.join(publicDir, "avant"))).map((file) => `avant/${file}`),
];
const labelText = await textWidth();

for (const file of files) {
  const source = path.join(originalsDir, file);
  const target = path.join(publicDir, file);
  if (!(await exists(source))) {
    await mkdir(path.dirname(source), { recursive: true });
    await copyFile(target, source);
  }

  const { width, height } = await sharp(source).metadata();
  await sharp(source)
    .composite([{ input: labelSvg(width, height, labelText), top: 0, left: 0 }])
    .png({ compressionLevel: 9 })
    .toFile(`${target}.tmp`);
  await rename(`${target}.tmp`, target);
  console.log(file);
}
