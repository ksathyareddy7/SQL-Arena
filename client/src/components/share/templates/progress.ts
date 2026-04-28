import { baseSvg, brandFooter, escapeXml } from "./base";
import type { DashboardStats } from "@/types/dashboard";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Check, Flame, Gauge, Timer } from "lucide-react";

export const renderProgressCard = (opts: {
  logoSvg: string;
  stats: DashboardStats | null;
}) => {
  const solved = opts.stats?.overall?.solved ?? 0;
  const easy = (opts.stats?.difficultyStats ?? []).find((d) => d.difficulty === "easy");
  const medium = (opts.stats?.difficultyStats ?? []).find((d) => d.difficulty === "medium");
  const hard = (opts.stats?.difficultyStats ?? []).find((d) => d.difficulty === "hard");
  const streak = opts.stats?.streaks?.current ?? 0;

  const content = `
  <text x="540" y="150" text-anchor="middle" class="label">SQL JOURNEY PROGRESS</text>
  <text x="540" y="270" text-anchor="middle" class="h1">${escapeXml(solved)}</text>
  <text x="540" y="330" text-anchor="middle" class="body" fill="rgba(255,255,255,0.78)">problems solved</text>

  <g transform="translate(40, 380)">
    ${statCard({
      x: 36,
      y: 36,
      w: 452,
      h: 150,
      label: "EASY",
      value: `${easy?.solved ?? 0}/${easy?.total ?? 0}`,
      icon: renderIcon(Check),
    })}

    ${statCard({
      x: 36 + 452 + 24,
      y: 36,
      w: 452,
      h: 150,
      label: "MEDIUM",
      value: `${medium?.solved ?? 0}/${medium?.total ?? 0}`,
      icon: renderIcon(Gauge),
    })}

    ${statCard({
      x: 36,
      y: 36 + 150 + 24,
      w: 452,
      h: 150,
      label: "HARD",
      value: `${hard?.solved ?? 0}/${hard?.total ?? 0}`,
      icon: renderIcon(Flame),
    })}

    ${statCard({
      x: 36 + 452 + 24,
      y: 36 + 150 + 24,
      w: 452,
      h: 150,
      label: "STREAK",
      value: `${streak} day${streak === 1 ? "" : "s"}`,
      icon: renderIcon(Timer),
    })}
  </g>

  ${brandFooter({ logoSvg: opts.logoSvg })}
  `;

  const caption = `📈 SQL journey progress\nSolved: ${solved}\nEasy: ${easy?.solved ?? 0}/${easy?.total ?? 0} • Medium: ${medium?.solved ?? 0}/${medium?.total ?? 0} • Hard: ${hard?.solved ?? 0}/${hard?.total ?? 0}\nStreak: ${streak} days\n\nSQL Arena`;
  return { svg: baseSvg(content), caption };
};

const statCard = (opts: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  value: string;
  icon?: string;
}) => {
  const x = opts.x;
  const y = opts.y;
  const w = opts.w;
  const h = opts.h;

  return `
    <g transform="translate(${x}, ${y})">
      <rect x="0" y="0" width="${w}" height="${h}" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)" />
      ${
        opts.icon
          ? `<g transform="translate(${w - 28 - 44}, 18)" opacity="0.9">${opts.icon}</g>`
          : ""
      }
      <text x="28" y="48" class="chip" fill="rgba(255,255,255,0.70)">${escapeXml(opts.label)}</text>
      <text x="28" y="108" class="h2" fill="rgba(255,255,255,0.96)">${escapeXml(opts.value)}</text>
    </g>
  `;
};

const renderIcon = (Icon: any) => {
  const svg = renderToStaticMarkup(
    createElement(Icon, {
      size: 44,
      color: "rgba(255,255,255,0.92)",
    }),
  );
  return svg.replace(/fill="currentColor"/g, 'fill="none"');
};
