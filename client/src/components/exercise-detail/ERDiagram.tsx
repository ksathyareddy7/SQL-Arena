import { useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "@/contexts/ThemeContext";

const getColumnName = (col) =>
  col?.name || col?.column_name || col?.field || col?.key || "";

const getColumnType = (col) =>
  col?.type || col?.data_type || col?.dataType || "";

const normalizeColumns = (cols) => {
  if (!Array.isArray(cols)) return [];
  return cols
    .map((c) => {
      if (!c) return null;
      if (typeof c === "string") return { name: c, type: "" };
      if (typeof c === "object") {
        const name = getColumnName(c);
        if (!name) return null;
        return {
          name,
          type: getColumnType(c),
          isPrimaryKey: !!(c.isPrimaryKey || c.pk || c.primary_key),
          isForeignKey: !!(c.isForeignKey || c.fk || c.foreign_key),
        };
      }
      return null;
    })
    .filter(Boolean);
};

function TableNode({ data }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const columns = Array.isArray(data?.columns) ? data.columns : [];
  const selected = !!data?.selected;
  const related = !!data?.related;

  return (
    <div
      className={`overflow-hidden rounded-lg border shadow-sm transition-colors ${
        isDark
          ? "border-slate-800 bg-slate-900 text-slate-100"
          : "border-slate-200 bg-white text-slate-900"
      } ${selected ? "ring-2 ring-blue-500" : related ? "ring-1 ring-blue-300/60" : ""}`}
      style={{ width: 280 }}
    >
      <div
        className={`px-3 py-2 text-sm font-semibold tracking-wide ${
          isDark ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
        }`}
      >
        {data?.tableName}
      </div>
      <div className="px-3 py-2 text-xs">
        {columns.length === 0 ? (
          <div className={isDark ? "text-slate-400" : "text-slate-500"}>
            No columns
          </div>
        ) : (
          <div className="space-y-1">
            {columns.map((c) => (
              <div
                key={c.name}
                className={`flex items-center justify-between gap-2 rounded px-2 py-1 ${
                  isDark ? "hover:bg-slate-800/70" : "hover:bg-slate-50"
                }`}
              >
                <div className="min-w-0 flex items-center gap-2">
                  <span className="font-mono truncate">{c.name}</span>
                  {c.isPrimaryKey ? (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                      PK
                    </span>
                  ) : null}
                  {c.isForeignKey ? (
                    <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                      FK
                    </span>
                  ) : null}
                </div>
                {c.type ? (
                  <span
                    className={`shrink-0 font-mono text-[10px] ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {String(c.type)}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Relationship connector handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        className="!h-2 !w-2 !border-2 !border-white !bg-blue-500"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        className="!h-2 !w-2 !border-2 !border-white !bg-blue-500"
      />
    </div>
  );
}

function Canvas({
  styledNodes,
  styledEdges,
  onNodesChange,
  onEdgesChange,
  nodeTypes,
  isDark,
  setInternalSelected,
  onSelectTable,
  onInit,
}) {
  return (
    <ReactFlow
      nodes={styledNodes}
      edges={styledEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      proOptions={{ hideAttribution: true }}
      onInit={onInit}
      onNodeClick={(_, node) => {
        setInternalSelected(node.id);
        onSelectTable?.(node.id);
      }}
      colorMode={isDark ? "dark" : "light"}
    >
      <Controls showInteractive={false} />
      <Background gap={16} size={1} />
    </ReactFlow>
  );
}

export default function ERDiagram({
  schemas = [],
  relationships = [],
  selectedTable = null,
  onSelectTable,
  fitViewTrigger,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { initialNodes, initialEdges } = useMemo(() => {
    const safeSchemas = Array.isArray(schemas) ? schemas : [];
    const nextNodes = safeSchemas.map((s, idx) => ({
      id: String(s.table_name),
      type: "table",
      data: {
        tableName: s.table_name,
        columns: normalizeColumns(s.columns),
      },
      position: { x: (idx % 3) * 320, y: Math.floor(idx / 3) * 220 },
    }));

    const nextEdges = (relationships || []).map((rel, idx) => ({
      id: `e-${idx}`,
      source: String(rel.from_table),
      target: String(rel.to_table),
      sourceHandle: "out",
      targetHandle: "in",
      type: "smoothstep",
      label:
        rel.from_column && rel.to_column
          ? `${rel.from_column} → ${rel.to_column}`
          : "fk",
      animated: false,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: isDark ? "#60a5fa" : "#2563eb",
      },
      style: { stroke: isDark ? "#60a5fa" : "#2563eb", strokeWidth: 2 },
      labelStyle: { fill: isDark ? "#93c5fd" : "#1d4ed8", fontSize: 10 },
      labelBgPadding: [6, 3] as [number, number],
      labelBgBorderRadius: 6,
      labelBgStyle: {
        fill: isDark ? "rgba(15, 23, 42, 0.85)" : "rgba(255,255,255,0.9)",
        stroke: isDark ? "rgba(148, 163, 184, 0.3)" : "rgba(37,99,235,0.25)",
      },
    }));

    return { initialNodes: nextNodes, initialEdges: nextEdges };
  }, [schemas, relationships, isDark]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [internalSelected, setInternalSelected] = useState(null);
  const [rf, setRf] = useState(null);

  const nodeTypes = useMemo(() => ({ table: TableNode }), []);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setInternalSelected(null);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  useEffect(() => {
    if (!rf) return;
    try {
      rf.fitView({ padding: 0.35, duration: 0 });
    } catch {
      // ignore
    }
  }, [rf, fitViewTrigger]);

  const effectiveSelected = selectedTable ?? internalSelected;

  const relatedIds = useMemo(() => {
    if (!effectiveSelected) return new Set();
    const set = new Set();
    for (const e of edges) {
      if (e.source === effectiveSelected) set.add(e.target);
      if (e.target === effectiveSelected) set.add(e.source);
    }
    return set;
  }, [edges, effectiveSelected]);

  const styledNodes = useMemo(() => {
    return nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        selected: effectiveSelected && n.id === effectiveSelected,
        related: effectiveSelected && relatedIds.has(n.id),
      },
    }));
  }, [nodes, effectiveSelected, relatedIds]);

  const styledEdges = useMemo(() => {
    return edges.map((e) => {
      const isActive =
        !effectiveSelected ||
        e.source === effectiveSelected ||
        e.target === effectiveSelected;
      return {
        ...e,
        animated: !!effectiveSelected && isActive,
        style: {
          ...(e.style || {}),
          opacity: isActive ? 1 : 0.15,
        },
      };
    });
  }, [edges, effectiveSelected]);

  return (
    <div className="h-full w-full overflow-hidden">
      <ReactFlowProvider>
        <Canvas
          styledNodes={styledNodes}
          styledEdges={styledEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          isDark={isDark}
          setInternalSelected={setInternalSelected}
          onSelectTable={onSelectTable}
          onInit={setRf}
        />
      </ReactFlowProvider>
    </div>
  );
}
