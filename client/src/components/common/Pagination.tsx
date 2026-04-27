import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PaginationButton from "@/components/common/PaginationButton";

function getPageItems(page: number, totalPages: number) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const items: (number | "...")[] = [1];

  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);

  if (left > 2) items.push("...");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < totalPages - 1) items.push("...");

  items.push(totalPages);
  return items;
}

type PaginationProps = {
  page: number;
  totalPages: number;
  onPage: (page: number) => void;
  className?: string;
};

export default function Pagination({
  page,
  totalPages,
  onPage,
  className,
}: PaginationProps) {
  const items = getPageItems(page, totalPages);

  return (
    <div className={cn("flex items-center justify-center pt-10", className)}>
      <div className="flex gap-2">
        <PaginationButton
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          ariaLabel="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </PaginationButton>

        {items.map((it, idx) =>
          it === "..." ? (
            <div
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-[#727785]"
            >
              ...
            </div>
          ) : (
            <PaginationButton
              key={it}
              onClick={() => onPage(it)}
              active={it === page}
            >
              {it}
            </PaginationButton>
          ),
        )}

        <PaginationButton
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          ariaLabel="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </PaginationButton>
      </div>
    </div>
  );
}
