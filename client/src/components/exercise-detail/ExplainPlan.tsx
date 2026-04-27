function formatNumber(n) {
  if (n === null || n === undefined || n === "") return null;
  const num = Number(n);
  if (!Number.isFinite(num)) return null;
  return num.toLocaleString();
}

function formatMs(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return null;
  return `${num.toFixed(3)} ms`;
}

function planTitle(node) {
  if (!node || typeof node !== "object") return "Plan";
  const nodeType = node["Node Type"] || "Node";
  const rel = node["Relation Name"];
  const idx = node["Index Name"];
  if (rel && idx) return `${nodeType} on ${rel} (${idx})`;
  if (rel) return `${nodeType} on ${rel}`;
  if (idx) return `${nodeType} (${idx})`;
  return nodeType;
}

function PlanNode({ node, level }) {
  const children = Array.isArray(node?.Plans) ? node.Plans : [];
  const openByDefault = level <= 1;

  const estCost =
    node?.["Total Cost"] !== undefined
      ? `${formatNumber(node["Startup Cost"])}..${formatNumber(node["Total Cost"])}`
      : null;
  const estRows = node?.["Plan Rows"] !== undefined ? formatNumber(node["Plan Rows"]) : null;
  const actTime =
    node?.["Actual Total Time"] !== undefined ? formatMs(node["Actual Total Time"]) : null;
  const actRows =
    node?.["Actual Rows"] !== undefined ? formatNumber(node["Actual Rows"]) : null;

  return (
    <details open={openByDefault} className="rounded-md border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
      <summary className="cursor-pointer select-none px-3 py-2 flex items-center justify-between gap-4">
        <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
          {planTitle(node)}
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          {actTime ? `actual ${actTime}` : null}
          {actTime && actRows ? " • " : null}
          {actRows ? `rows ${actRows}` : null}
          {(actTime || actRows) && (estCost || estRows) ? " • " : null}
          {estCost ? `cost ${estCost}` : null}
          {estCost && estRows ? " • " : null}
          {estRows ? `est rows ${estRows}` : null}
        </div>
      </summary>

      {children.length > 0 && (
        <div className="px-3 pb-3">
          <div className="pl-3 border-l border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {children.map((c, idx) => (
              <PlanNode key={`${level}-${idx}`} node={c} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </details>
  );
}

export default function ExplainPlan({ plan }) {
  const planArray = Array.isArray(plan) ? plan : null;
  const rootObj = planArray?.[0] && typeof planArray[0] === "object" ? planArray[0] : null;
  const rootPlan = rootObj?.Plan || null;

  const planningTime = rootObj?.["Planning Time"];
  const executionTime = rootObj?.["Execution Time"];

  if (!rootPlan) {
    return (
      <div className="p-4 text-sm text-slate-600 dark:text-slate-300">
        No plan yet. Click <span className="font-medium">Explain</span> to generate one.
      </div>
    );
  }

  return (
    <div className="p-3 flex flex-col gap-3">
      {(planningTime !== undefined || executionTime !== undefined) && (
        <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-3">
          {planningTime !== undefined && (
            <div>
              Planning: <span className="font-medium">{formatMs(planningTime)}</span>
            </div>
          )}
          {executionTime !== undefined && (
            <div>
              Execution: <span className="font-medium">{formatMs(executionTime)}</span>
            </div>
          )}
        </div>
      )}

      <PlanNode node={rootPlan} level={0} />

      <details className="rounded-md border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40">
        <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100">
          Raw JSON
        </summary>
        <pre className="px-3 pb-3 overflow-auto text-xs text-slate-700 dark:text-slate-200">
          {JSON.stringify(planArray, null, 2)}
        </pre>
      </details>
    </div>
  );
}

