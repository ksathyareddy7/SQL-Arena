import { cn } from "@/lib/utils";

type SegmentedControlProps<T> = {
  label: string;
  options: T[];
  value: T;
  onChange: (next: T) => void;
  getText?: (opt: T) => string;
  className?: string;
};

export default function SegmentedControl<T>({
  label,
  options,
  value,
  onChange,
  getText,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
        {label}
      </span>
      <div className="flex p-1 bg-[var(--arena-surface-container-high)] rounded-lg">
        {options.map((opt) => {
          const selected = opt === value;
          return (
            <button
              key={String(opt)}
              type="button"
              onClick={() => onChange(opt)}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-md transition-colors",
                selected
                  ? "bg-[var(--arena-surface-container-lowest)] dark:bg-white shadow-sm text-[var(--arena-primary)]"
                  : "text-[var(--arena-label)] hover:text-[color:rgb(66_71_84/1)] dark:hover:text-[var(--arena-on-surface)]",
              )}
            >
              {getText ? getText(opt) : String(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
