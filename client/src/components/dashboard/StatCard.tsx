import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function StatCard({
  label,
  value,
  Icon,
  valueClassName,
}: {
  label: string;
  value: ReactNode;
  Icon: ComponentType<{ className?: string }>;
  valueClassName?: string;
}) {
  return (
    <div className="arena-bg-lowest p-8 rounded-xl relative overflow-hidden group">
      <div className="relative z-10">
        <span className="text-[12px] tracking-[0.10em] font-bold uppercase text-[var(--arena-outline)] block mb-4">
          {label}
        </span>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              "text-4xl font-extrabold tracking-tight",
              valueClassName,
            )}
          >
            {value}
          </span>
        </div>
      </div>
      <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
        <Icon className="w-28 h-28 text-[var(--arena-on-surface)]" />
      </div>
    </div>
  );
}

