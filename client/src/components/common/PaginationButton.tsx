import React from "react";
import { cn } from "@/lib/utils";

export default function PaginationButton({
  active,
  disabled,
  children,
  onClick,
  ariaLabel,
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors",
        active
          ? "bg-[var(--arena-primary)] text-white"
          : "bg-[var(--arena-surface-container-high)] text-[var(--arena-on-surface)] hover:bg-[var(--arena-surface-container-highest)]",
        disabled &&
          "opacity-40 disabled:hover:bg-[var(--arena-surface-container-high)]",
      )}
    >
      {children}
    </button>
  );
}

