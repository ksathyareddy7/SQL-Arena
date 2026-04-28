import { baseSvg, brandFooter, escapeXml } from "./base";
import { BadgeCheck } from "lucide-react";
import { ICON_COMPONENTS } from "@/components/badges/badgeIcons";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const renderBadgeAchievementCard = (opts: {
  logoSvg: string;
  iconKey?: string | null;
  title: string;
  description: string;
  earnedAtLabel?: string | null;
}) => {
  const title = String(opts.title ?? "").trim();
  const description = String(opts.description ?? "").trim();
  const iconMarkup = renderLucideIconSvg(opts.iconKey);
  const content = `
  <text x="540" y="160" text-anchor="middle" class="label" style="font-size:34px;">BADGE UNLOCKED</text>

  <g transform="translate(0, 0)">
    <circle cx="540" cy="360" r="104" fill="rgba(37,99,235,0.22)" stroke="rgba(37,99,235,0.55)" stroke-width="2" />
    <circle cx="540" cy="360" r="78" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
    <g transform="translate(540, 360) translate(-34, -34)">
      ${iconMarkup}
    </g>
  </g>

  <text x="540" y="580" text-anchor="middle" class="h2" style="font-size:80px; letter-spacing: 2px;">${escapeXml(title)}</text>
  <text x="540" y="660" text-anchor="middle" class="body" style="font-size:36px;" fill="rgba(255,255,255,0.80)">${escapeXml(description)}</text>
  ${
    opts.earnedAtLabel
      ? `<text x="536" y="730" text-anchor="middle" class="body" style="font-size:28px;" fill="rgba(255,255,255,0.70)">Earned ${escapeXml(opts.earnedAtLabel)}</text>`
      : ""
  }

  ${brandFooter({ logoSvg: opts.logoSvg })}
  `;

  const caption = `🏅 Badge unlocked: ${title}\n${description}\n\nSQL Arena\n\nhttps://github.com/ksathyareddy7/sql-arena`;
  return { svg: baseSvg(content), caption };
};


const renderLucideIconSvg = (iconKey?: string | null) => {
  const Icon: any = (iconKey && ICON_COMPONENTS[iconKey]) || BadgeCheck;

  // lucide-react components render to <svg>, so we can render to a string safely.
  // We embed the SVG inside our larger SVG and position it via parent <g>.
  const svg = renderToStaticMarkup(
    createElement(Icon, {
      size: 68,
      color: "rgba(255,255,255,0.92)",
    }),
  );

  // Ensure nested svg doesn't introduce an unexpected background fill.
  return svg.replace(/fill="currentColor"/g, 'fill="none"');
};
