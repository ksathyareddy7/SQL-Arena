import React, { useEffect, useMemo, useState } from "react";
import {
  Maximize2,
  Minimize2,
  Search,
  Table2,
  GitBranch,
  Boxes,
  Code2,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ERDiagram from "@/components/exercise-detail/ERDiagram";
import MermaidFlowViewer from "@/components/exercise-detail/MermaidFlowViewer";
import TabsButtonGroup from "@/components/common/TabsButtonGroup";

const sanitizeId = (name: string) =>
  String(name || "")
    .trim()
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .replace(/^(\d)/, "_$1");

const safeType = (t: string) =>
  String(t || "text")
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_");

// Mermaid ER diagrams accept a small set of "type" tokens. Mapping our DB
// types to a stable, low-entropy set avoids parse issues (and keeps diagrams
// readable) while still conveying the gist of each column.
const toMermaidErType = (raw: string) => {
  const t = safeType(raw);
  if (!t) return "string";
  if (t.includes("bool")) return "boolean";
  if (t.includes("int") || t.includes("serial")) return "int";
  if (t.includes("numeric") || t.includes("decimal") || t.includes("real") || t.includes("double") || t.includes("float")) return "float";
  if (t.includes("timestamp") || t.includes("datetime")) return "datetime";
  if (t === "date") return "date";
  if (t.includes("uuid")) return "uuid";
  return "string";
};

function buildMermaidChart(schemas: any[] = [], relationships: any[] = []) {
  const safeSchemas = Array.isArray(schemas) ? schemas : [];
  const safeRelationships = Array.isArray(relationships) ? relationships : [];

  const schemaLines = safeSchemas.map((s) => {
    const table = sanitizeId(s.table_name);
    const cols = Array.isArray(s.columns) ? s.columns : [];
    const colLines = cols
      .map((c) => {
        const name = sanitizeId(c?.name || c?.column_name || "");
        const type = toMermaidErType(c?.type || c?.data_type || "");
        if (!name) return null;
        return `    ${type} ${name}`;
      })
      .filter(Boolean);

    return [`  ${table} {`, ...colLines, "  }"].join("\n");
  });

  const relLines = safeRelationships
    .map((r) => {
      const fromTable = sanitizeId(r.from_table || r.fromTable);
      const toTable = sanitizeId(r.to_table || r.toTable);
      if (!fromTable || !toTable) return null;
      const fromCol = sanitizeId(r.from_column || r.fromColumn);
      const toCol = sanitizeId(r.to_column || r.toColumn);
      const label = [fromCol, toCol].filter(Boolean).join(" -> ");

      // `from_table.from_column` references `to_table.to_column` (FK), so this is:
      // one `toTable` row to many `fromTable` rows.
      // Mermaid ER syntax example: `CUSTOMER ||--o{ ORDER : places`
      return `  ${toTable} ||--o{ ${fromTable} : "${label || "fk"}"`;
    })
    .filter(Boolean);

  // Always render ER diagrams (even if there are no relationships) so users can
  // still see table shapes and columns for single-table exercises.
  return ["erDiagram", ...schemaLines, ...relLines].join("\n");
}

type Tab = "visual" | "mermaid" | "rels";

export default function SchemaExplorer({
  schemas = [],
  relationships = [],
}: {
  schemas?: any[];
  relationships?: any[];
}) {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [tab, setTab] = useState<Tab>("visual");

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const tables = useMemo(() => {
    const safeSchemas = Array.isArray(schemas) ? schemas : [];
    const rels = Array.isArray(relationships) ? relationships : [];
    const relCount = new Map<string, number>();
    for (const r of rels) {
      relCount.set(r.from_table, (relCount.get(r.from_table) || 0) + 1);
      relCount.set(r.to_table, (relCount.get(r.to_table) || 0) + 1);
    }

    return safeSchemas
      .map((s) => ({
        tableName: s.table_name,
        columnsCount: Array.isArray(s.columns) ? s.columns.length : 0,
        relationshipsCount: relCount.get(s.table_name) || 0,
      }))
      .sort((a, b) => a.tableName.localeCompare(b.tableName));
  }, [schemas, relationships]);

  const filteredTables = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return tables;
    return tables.filter((t) => t.tableName.toLowerCase().includes(needle));
  }, [tables, q]);

  const relationshipList = useMemo(() => {
    const rels = Array.isArray(relationships) ? relationships : [];
    const needle = q.trim().toLowerCase();
    const rows = rels.map((r, idx) => ({
      id: `${r.from_table}-${r.to_table}-${idx}`,
      from: `${r.from_table}${r.from_column ? "." + r.from_column : ""}`,
      to: `${r.to_table}${r.to_column ? "." + r.to_column : ""}`,
    }));
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.from.toLowerCase().includes(needle) ||
        r.to.toLowerCase().includes(needle),
    );
  }, [relationships, q]);

  const mermaidChart = useMemo(
    () => buildMermaidChart(schemas, relationships),
    [schemas, relationships],
  );

  return (
    <div
      className={
        expanded
          ? "fixed inset-0 z-50 bg-[var(--arena-surface)]"
          : "min-h-[calc(100vh-180px)]"
      }
    >
      <div
        className={cn(
          "grid grid-cols-12 gap-6 h-full",
          expanded ? "h-screen p-6" : "",
        )}
      >
        <aside className="col-span-12 lg:col-span-3 h-full">
          <div className="rounded-xl bg-[var(--arena-surface-container-lowest)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[color:rgb(194_198_214/0.10)] dark:border-[color:rgb(42_51_66/0.7)]">
              <div className="text-[11px] font-black uppercase tracking-widest text-[var(--arena-label)]">
                Tables
              </div>
            </div>
            <div className="p-2">
              <div className="flex flex-col gap-1">
                {filteredTables.map((t) => {
                  const active = selectedTable === t.tableName;
                  return (
                    <button
                      key={t.tableName}
                      type="button"
                      onClick={() =>
                        setSelectedTable(active ? null : t.tableName)
                      }
                      className={cn(
                        "w-full text-left rounded-lg px-3 py-2 border transition-colors",
                        active
                          ? "border-[color:rgb(0_88_190/0.35)] bg-[color:rgb(0_88_190/0.06)]"
                          : "border-transparent hover:border-[color:rgb(194_198_214/0.20)] hover:bg-[var(--arena-surface-container-low)]",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Table2 className="h-4 w-4 text-[var(--arena-primary)] shrink-0" />
                          <div className="font-bold text-sm truncate arena-text-on-surface">
                            {t.tableName}
                          </div>
                        </div>
                        <div className="text-[11px] font-bold text-[var(--arena-label)] shrink-0">
                          {t.columnsCount} cols
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-9 flex flex-col min-w-0 h-full">
          <header className="pb-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight arena-text-on-surface mb-1">
                  Schema
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Boxes className="h-4 w-4 text-[var(--arena-placeholder)]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--arena-label)]">
                      {tables.length} tables
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch className="h-4 w-4 text-[var(--arena-placeholder)]" />
                    <span className="text-xs font-black uppercase tracking-widest text-[var(--arena-label)]">
                      {Array.isArray(relationships) ? relationships.length : 0}{" "}
                      relationships
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TabsButtonGroup
                  value={tab}
                  variant="segmented"
                  size="md"
                  onChange={(next) => setTab(next)}
                  items={[
                    {
                      value: "visual",
                      label: "Visual",
                      icon: <Share2 className="h-4 w-4" />,
                    },
                    {
                      value: "mermaid",
                      label: "Mermaid",
                      icon: <Code2 className="h-4 w-4" />,
                    },
                    {
                      value: "rels",
                      label: "Relationships",
                      icon: <GitBranch className="h-4 w-4" />,
                    },
                  ]}
                />

                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--arena-primary)] text-white px-5 py-2.5 shadow-xl shadow-[color:rgb(0_88_190/0.20)] font-bold text-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                  {expanded ? "Exit fullscreen" : "Fullscreen"}
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-xl my-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--arena-placeholder)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search tables or relationships..."
                className="w-full bg-[var(--arena-surface-container-low)] border-none rounded-xl pl-12 pr-4 py-3 text-sm text-[var(--arena-on-surface)] placeholder:text-[var(--arena-placeholder)] focus:ring-2 ring-[color:rgb(0_88_190/0.10)] transition-all"
              />
            </div>
          </header>

          <div
            className={cn(
              "flex-1 mt-4 min-h-[520px] relative bg-[var(--arena-surface-container)] rounded-3xl overflow-hidden border border-[color:rgb(194_198_214/0.25)]",
              expanded ? "m-0" : "m-0",
            )}
          >
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#004191 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="absolute inset-0">
              {tab === "visual" ? (
                <ERDiagram
                  schemas={schemas}
                  relationships={relationships}
                  selectedTable={selectedTable}
                  onSelectTable={setSelectedTable}
                  fitViewTrigger={expanded}
                />
              ) : null}

              {tab === "mermaid" ? (
                <MermaidFlowViewer
                  chart={mermaidChart}
                  fitViewTrigger={expanded}
                />
              ) : null}

              {tab === "rels" ? (
                <div className="h-full overflow-auto p-6">
                  {relationshipList.length === 0 ? (
                    <div className="text-sm text-[var(--arena-label)]">
                      No relationships.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {relationshipList.map((r) => (
                        <div
                          key={r.id}
                          className="rounded-xl bg-[var(--arena-surface-container-lowest)] border border-[color:rgb(194_198_214/0.20)] dark:border-[color:rgb(42_51_66/0.7)] px-4 py-3"
                        >
                          <div className="text-sm font-bold arena-text-on-surface">
                            {r.from}
                          </div>
                          <div className="text-sm text-[var(--arena-label)]">
                            → {r.to}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
