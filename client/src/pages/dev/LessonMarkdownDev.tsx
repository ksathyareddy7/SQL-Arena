import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import Select from "@/components/filters/Select";

// Dev-only: file-based markdown preview for lessons using the V2 renderer.
// Uses Vite `import.meta.glob` so edits hot-reload immediately on save.
const lessonFiles = import.meta.glob(
  "../../../../../server/database/base/lessons/*.md",
  {
    as: "raw",
    eager: true,
  },
) as Record<string, string>;

const toFileName = (p: string) => p.split("/").pop() || p;

export default function LessonMarkdownDev() {
  const [searchParams, setSearchParams] = useSearchParams();

  const options = useMemo(() => {
    const names = Object.keys(lessonFiles).map(toFileName);
    names.sort((a, b) => a.localeCompare(b));
    return names;
  }, []);

  const requested = searchParams.get("file") || "";
  const defaultFile =
    options.find((n) => n === "select-basics.md") || options[0] || "";
  const selectedFile = options.includes(requested) ? requested : defaultFile;

  const content = useMemo(() => {
    const entry = Object.entries(lessonFiles).find(
      ([p]) => toFileName(p) === selectedFile,
    );
    return entry?.[1] || "";
  }, [selectedFile]);

  const setFile = (file: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("file", file);
        return next;
      },
      { replace: true },
    );
  };

  if (!import.meta.env.DEV) {
    return (
      <div className="max-w-[1440px] mx-auto mt-12">
        <div className="arena-bg-low rounded-xl p-6">
          <div className="text-sm font-bold text-[var(--arena-outline)]">
            This page is available only in dev.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 max-w-[1440px] mx-auto mt-12">
      <section className="arena-bg-low rounded-xl p-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Select
            label="Lesson file"
            options={options}
            value={selectedFile}
            onChange={(v) => setFile(String(v))}
            placeholder="Select a lesson file..."
            className="min-w-[360px]"
          />

          <div className="text-sm font-bold text-[var(--arena-outline)] dark:text-[var(--arena-placeholder)]">
            Hot reload is enabled — save the file to refresh preview.
          </div>
        </div>
      </section>

      <MarkdownRenderer content={content} />
    </div>
  );
}
