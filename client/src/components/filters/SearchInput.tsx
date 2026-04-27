import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type SearchInputProps = {
  value: string;
  onChange: (next: string) => void;
  onClear: () => void;
  label?: string;
  className?: string;
};

export default function SearchInput({
  value,
  onChange,
  onClear,
  label = "Search",
  className,
}: SearchInputProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label className="block text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          className="w-full arena-bg-lowest text-[var(--arena-on-surface)] placeholder:text-[var(--arena-placeholder)] border-none ring-1 ring-[color:rgb(194_198_214/0.15)] dark:ring-[color:rgb(42_51_66/0.6)] focus:ring-2 focus:ring-[var(--arena-primary)] rounded-lg py-2.5 pl-10 pr-10 text-sm font-medium transition-all"
          placeholder="Search by name, code or #ID..."
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 w-5 h-5 text-[var(--arena-placeholder)]" />
        {value ? (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--arena-placeholder)] hover:text-[var(--arena-on-surface)] transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
