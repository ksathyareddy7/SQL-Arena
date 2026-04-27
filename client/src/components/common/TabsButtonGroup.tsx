import React from "react";
import { cn } from "@/lib/utils";

export type TabsButtonVariant = "underline" | "segmented";
export type TabsButtonSize = "sm" | "md";

export type TabsButtonItem<T extends string> = {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  onDisabledClick?: () => void;
};

export default function TabsButtonGroup<T extends string>({
  value,
  items,
  onChange,
  variant = "underline",
  size = "md",
  className,
}: {
  value: T;
  items: TabsButtonItem<T>[];
  onChange: (next: T) => void;
  variant?: TabsButtonVariant;
  size?: TabsButtonSize;
  className?: string;
}) {
  if (variant === "segmented") {
    const buttonBase =
      size === "sm"
        ? "px-4 py-1.5 text-xs font-black rounded-md"
        : "px-4 py-1.5 rounded-lg text-sm font-bold";

    return (
      <div
        className={cn(
          "flex gap-1 p-1 bg-[var(--arena-surface-container-high)] rounded-xl",
          className,
        )}
      >
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button
              key={it.value}
              type="button"
              title={it.title}
              aria-disabled={it.disabled ? true : undefined}
              onClick={() => {
                if (it.disabled) return it.onDisabledClick?.();
                onChange(it.value);
              }}
              className={cn(
                "flex items-center gap-2 transition-colors",
                buttonBase,
                active
                  ? "bg-[var(--arena-surface-container-lowest)] text-[var(--arena-primary)] shadow-sm dark:bg-slate-900"
                  : "text-[var(--arena-label)] hover:text-[var(--arena-primary)]",
                it.disabled ? "opacity-50 cursor-not-allowed" : "",
              )}
            >
              {it.icon}
              <span className="inline-flex items-center">
                {it.label}
                {it.badge ? <span className="ml-2">{it.badge}</span> : null}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // underline
  return (
    <div className={cn("flex items-center gap-10", className)}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button
            key={it.value}
            type="button"
            title={it.title}
            aria-disabled={it.disabled ? true : undefined}
            onClick={() => {
              if (it.disabled) return it.onDisabledClick?.();
              onChange(it.value);
            }}
            className={cn(
              "relative h-12 inline-flex items-center justify-start",
              "text-[12px] font-black uppercase tracking-[0.18em] transition-colors",
              active
                ? "text-[var(--arena-primary)]"
                : "text-[var(--arena-placeholder)]",
              it.disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-[var(--arena-primary)]",
            )}
          >
            {it.icon}
            <span className="inline-flex items-center">
              {it.label}
              {it.badge ? <span className="ml-2">{it.badge}</span> : null}
            </span>
            {active ? (
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[var(--arena-primary)]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
