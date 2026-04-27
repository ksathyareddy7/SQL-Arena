import { useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "@/contexts/ThemeContext";
import Mermaid from "@/components/common/Mermaid";

function MermaidNode({ data }) {
  return (
    <div className="p-3 w-full [&_svg]:max-w-none [&_svg]:h-auto">
      <Mermaid chart={data.chart} />
    </div>
  );
}

export default function MermaidFlowViewer({ chart, fitViewTrigger }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [rf, setRf] = useState(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [viewerWidth, setViewerWidth] = useState<number>(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const apply = () => setViewerWidth(el.getBoundingClientRect().width);
    apply();
    const ro = new ResizeObserver(() => apply());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodeTypes = useMemo(() => ({ mermaid: MermaidNode }), []);
  const nodes = useMemo(
    () => [
      {
        id: "mermaid",
        type: "mermaid",
        position: { x: 0, y: 0 },
        style: {
          width: Math.max(320, Math.min(1100, (viewerWidth || 900) - 80)),
        },
        data: { chart },
      },
    ],
    [chart, viewerWidth],
  );
  const edges = useMemo(() => [], []);

  useEffect(() => {
    if (!rf) return;
    // Fit on first render, chart updates, and parent layout changes (e.g. fullscreen toggle)
    const t = setTimeout(() => {
      try {
        rf.fitView({ padding: 0.2, duration: 0 });
      } catch {
        // ignore
      }
    }, 50);
    return () => clearTimeout(t);
  }, [rf, chart, fitViewTrigger]);

  return (
    <div
      ref={wrapRef}
      className="h-full w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick={false}
          minZoom={0.2}
          maxZoom={3}
          onInit={setRf}
          proOptions={{ hideAttribution: true }}
          colorMode={isDark ? "dark" : "light"}
        >
          <Controls showInteractive={false} />
          <Background gap={16} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}
