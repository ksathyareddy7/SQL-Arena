import { svgToDataUrl } from "@/components/share/renderToPng";

type FooterProps = { logoSvg: string };

export const brandFooter = ({ logoSvg }: FooterProps) => {
  const logoData = svgToDataUrl(logoSvg);

  // Footer layout constants (kept in one place so all share templates align).
  const pad = 64;
  const footerH = 120;
  const footerY = 1080 - pad - footerH;

  const logoSize = 100;
  const gap = 14;
  const text = "SQL Arena";
  const textSize = 34;
  const textWeight = 900;

  // Approximate text width so we can center the group (good enough for share cards).
  const approxCharW = textSize * 0.56;
  const approxTextW = Math.round(text.length * approxCharW);
  const groupW = logoSize + gap + approxTextW;
  const groupX = Math.round((1080 - groupW) / 2);

  const logoX = groupX;
  const logoY = footerY + Math.round((footerH - logoSize) / 2);

  const textX = logoX + logoSize + gap;
  const textY = footerY + Math.round(footerH / 2) + 12;

  return `
  <g opacity="0.95">
    <rect x="${pad}" y="${footerY}" width="${1080 - pad * 2}" height="${footerH}" rx="28" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
    <image href="${logoData}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" />
    <text x="${textX}" y="${textY}" font-size="${textSize}" font-weight="${textWeight}" fill="rgba(255,255,255,0.96)" font-family="Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
      ${text}
    </text>
  </g>`;
};

export const escapeXml = (v: unknown) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const bg = () => `
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#061A33" />
    <stop offset="0.55" stop-color="#071B3A" />
    <stop offset="1" stop-color="#0A0F1C" />
  </linearGradient>
  <radialGradient id="glow" cx="0.2" cy="0.15" r="0.8">
    <stop offset="0" stop-color="rgba(37,99,235,0.55)" />
    <stop offset="1" stop-color="rgba(37,99,235,0)" />
  </radialGradient>
</defs>
<rect x="0" y="0" width="1080" height="1080" rx="56" fill="url(#bg)" />
<rect x="0" y="0" width="1080" height="1080" rx="56" fill="url(#glow)" />
`;

export const baseSvg = (content: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <style>
    .h1 { font: 900 86px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill: #fff; letter-spacing: -1px; }
    .h2 { font: 800 44px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill: rgba(255,255,255,0.92); letter-spacing: -0.5px; }
    .label { font: 800 24px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill: rgba(255,255,255,0.72); letter-spacing: 0.18em; text-transform: uppercase; }
    .body { font: 600 28px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill: rgba(255,255,255,0.82); }
    .mono { font: 700 28px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; fill: rgba(255,255,255,0.9); }
    .chip { font: 800 22px Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; fill: rgba(255,255,255,0.88); letter-spacing: 0.12em; }
  </style>
  ${bg()}
  ${content}
</svg>`;
