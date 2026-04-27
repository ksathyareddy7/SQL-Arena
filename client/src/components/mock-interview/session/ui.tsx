import { cn } from "@/lib/utils";

export function toDifficultyLabel(difficulty: string) {
  const v = String(difficulty || "").toLowerCase();
  return v ? v[0].toUpperCase() + v.slice(1) : "—";
}

export function StatusBadge({
  ok,
  label,
  title,
}: {
  ok: boolean;
  label: string;
  title?: string;
}) {
  return (
    <span
      title={title}
      className={cn(
        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.12em]",
        ok
          ? "bg-[color-mix(in_srgb,var(--arena-tertiary-fixed)_55%,transparent)] text-[var(--arena-tertiary-container)] dark:bg-[color-mix(in_srgb,var(--arena-tertiary-fixed)_22%,transparent)] dark:text-[color:rgb(159_244_200/0.95)]"
          : "bg-[color-mix(in_srgb,var(--arena-error-container)_70%,transparent)] text-[var(--arena-on-error-container)] dark:bg-[color-mix(in_srgb,var(--arena-error-container)_28%,transparent)] dark:text-[color:rgb(255_218_214/0.95)]",
      )}
    >
      {label}
    </span>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="bg-[var(--arena-surface-container)] px-1.5 py-0.5 rounded text-[var(--arena-primary)] text-[11px] font-mono font-semibold">
      {children}
    </code>
  );
}

export function renderInlineCode(text: string) {
  // Basic backtick parsing for descriptions that include `code` markers.
  const parts = String(text || "").split("`");
  if (parts.length <= 1) return text;
  return parts.map((p, idx) =>
    idx % 2 === 1 ? (
      <InlineCode key={idx}>{p}</InlineCode>
    ) : (
      <span key={idx}>{p}</span>
    ),
  );
}

