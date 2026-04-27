import { useEffect, useId, useMemo, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  chart: string;
};

let lastInitializedTheme: "dark" | "default" | null = null;

export default function Mermaid({ chart }: Props) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reactId = useId();
  const renderId = useMemo(
    () => `mermaid-${String(reactId).replaceAll(":", "")}`,
    [reactId],
  );

  useEffect(() => {
    if (!chart || !containerRef.current) return;
    const container = containerRef.current;
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    const desiredTheme: "dark" | "default" = theme === "dark"
      ? "dark"
      : "default";

    const render = async () => {
      if (!containerRef.current) return;
      container.innerHTML = "";

      // Wait for layout so mermaid can measure properly. Without this, diagrams
      // rendered inside hidden/zero-width containers can end up as empty SVGs.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const width = container.getBoundingClientRect().width;
      if (width === 0) {
        ro = new ResizeObserver(() => {
          if (cancelled) return;
          const w = container.getBoundingClientRect().width;
          if (w > 0) {
            ro?.disconnect();
            ro = null;
            void render();
          }
        });
        ro.observe(container);
        return;
      }

      if (lastInitializedTheme !== desiredTheme) {
        mermaid.initialize({
          startOnLoad: false,
          theme: desiredTheme,
          securityLevel: "loose",
        });
        lastInitializedTheme = desiredTheme;
      }

      try {
        const { svg } = await mermaid.render(renderId, chart, container);
        if (cancelled) return;
        container.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        if (!cancelled) {
          container.innerHTML =
            `<div class="text-rose-500 font-mono text-sm p-4 border border-rose-500 rounded bg-rose-500/10">Failed to render Mermaid diagram</div>`;
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, [chart, theme, renderId]);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center"
    />
  );
}
