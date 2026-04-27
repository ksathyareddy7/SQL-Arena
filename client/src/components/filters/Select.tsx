import ReactSelect from "react-select";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";

type Option = { value: string; label: string };

const toLabel = (value: string) =>
  (value.charAt(0).toUpperCase() + value.slice(1)).replace(/_/g, " ");

type SelectProps = {
  label: string;
  options: string[];
  value: string | string[];
  onChange: (next: string | string[]) => void;
  placeholder: string;
  isMulti?: boolean;
  className?: string;
};

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  isMulti,
  className,
}: SelectProps) {
  const selectOptions: Option[] = options.map((o) => ({
    value: o,
    label: toLabel(o),
  }));

  const selected = Array.isArray(value)
    ? selectOptions.filter((o) => value.includes(o.value))
    : selectOptions.find((o) => o.value === value) || null;

  return (
    <div className={cn("flex flex-col gap-2 flex-1", className)}>
      <span className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
        {label}
      </span>
      <ReactSelect
        isMulti={!!isMulti}
        unstyled
        options={selectOptions}
        value={selected as any}
        components={{
          DropdownIndicator: (props) => (
            <div
              {...props.innerProps}
              className="px-2 text-[var(--arena-outline)] hover:text-[var(--arena-on-surface)] cursor-pointer"
              aria-hidden
            >
              <ChevronDown className="w-4 h-4" />
            </div>
          ),
          ClearIndicator: (props) => (
            <div
              {...props.innerProps}
              className="px-1 text-[var(--arena-outline)] hover:text-[var(--arena-on-surface)] cursor-pointer"
              aria-hidden
            >
              <X className="w-4 h-4" />
            </div>
          ),
          IndicatorSeparator: () => null,
        }}
        onChange={(next) => {
          if (!next) return onChange(isMulti ? [] : "");
          if (Array.isArray(next)) return onChange(next.map((n) => n.value));
          return onChange(next.value);
        }}
        placeholder={placeholder}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              "w-full flex items-center justify-between px-4 py-2.5 bg-[var(--arena-surface-container-lowest)] rounded-lg text-sm font-bold text-[var(--arena-on-surface)] ring-1 transition-all min-h-[44px]",
              isFocused
                ? "ring-2 ring-[var(--arena-primary)]"
                : "ring-[color:rgb(194_198_214/0.15)] dark:ring-[color:rgb(42_51_66/0.6)] hover:ring-[color:rgb(0_88_190/0.5)]",
            ),
          placeholder: () => "text-[var(--arena-placeholder)] px-2",
          input: () => "text-[var(--arena-on-surface)] px-2",
          singleValue: () => "text-[var(--arena-on-surface)] px-2",
          valueContainer: () => "gap-1 px-1 flex-1",
          indicatorsContainer: () => "gap-1 px-1 text-[var(--arena-placeholder)]",
          menu: () =>
            "mt-1 rounded-lg border border-[color:rgb(194_198_214/0.30)] dark:border-[color:rgb(42_51_66/0.8)] bg-[var(--arena-surface-container-lowest)] shadow-md",
          menuList: () => "p-1 flex flex-col gap-0.5",
          option: ({ isFocused, isSelected }) =>
            cn(
              "px-3 py-2 rounded-md text-sm cursor-default",
              isSelected
                ? "bg-[var(--arena-primary)] text-white"
                : isFocused
                  ? "bg-[var(--arena-surface-container-low)] text-[var(--arena-on-surface)]"
                  : "text-[color:rgb(55_65_81/1)] dark:text-slate-200",
            ),
          multiValue: () =>
            "dark:bg-white bg-[var(--arena-surface-container-high)] rounded-md flex items-center px-2 py-0.5",
          multiValueLabel: () =>
            "text-[var(--arena-primary)] text-xs font-bold",
          multiValueRemove: () =>
            "text-[var(--arena-primary)] hover:text-[var(--arena-on-surface)] hover:bg-[var(--arena-surface-container-highest)] rounded-md ml-1 px-0.5",
          noOptionsMessage: () => "text-[var(--arena-outline)] p-2 text-sm",
        }}
      />
    </div>
  );
}
