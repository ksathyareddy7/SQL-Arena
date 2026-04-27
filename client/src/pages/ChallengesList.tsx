import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  useExercisesListQuery,
  useExercisesMetaQuery,
} from "@/queries/exercises";
import SearchInput from "@/components/filters/SearchInput";
import SegmentedControl from "@/components/filters/SegmentedControl";
import Select from "@/components/filters/Select";
import ChallengeRow from "@/components/challenges/ChallengeRow";
import Pagination from "@/components/common/Pagination";
import { getAppsFromMeta } from "@/constants/apps";

const statusOptions = ["All", "solved", "attempted", "not_started"] as const;
const difficultyOptions = ["All", "easy", "medium", "hard"] as const;

const toStatusLabel = (s: string) =>
  s === "not_started"
    ? "Not Started"
    : s === "All"
      ? "All Status"
      : s[0].toUpperCase() + s.slice(1);

export default function ChallengesList() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const filterApps = searchParams.get("app")
    ? searchParams.get("app")!.split(",").filter(Boolean)
    : [];
  const filterDiff = searchParams.get("diff") || "All";
  const filterStatus = searchParams.get("status") || "All";
  const searchQuery = searchParams.get("q") || "";
  const filterConcepts = searchParams.get("concepts")
    ? searchParams.get("concepts")!.split(",").filter(Boolean)
    : [];
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const appsKey = useMemo(() => filterApps.join(","), [filterApps]);
  const conceptsKey = useMemo(() => filterConcepts.join(","), [filterConcepts]);

  const setParam = (key: string, value: string | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === "All") next.delete(key);
        else next.set(key, value);
        if (key !== "page") next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  const listParams = useMemo(() => {
    const params: Record<string, any> = { page, limit };
    if (appsKey) params.app = appsKey;
    if (filterDiff !== "All") params.difficulty = filterDiff;
    if (filterStatus !== "All") params.status = filterStatus;
    if (searchQuery) params.q = searchQuery;
    if (conceptsKey) params.concepts = conceptsKey;
    return params;
  }, [
    page,
    limit,
    appsKey,
    filterDiff,
    filterStatus,
    searchQuery,
    conceptsKey,
  ]);

  const metaQuery = useExercisesMetaQuery(user?.id);
  const exercisesQuery = useExercisesListQuery(listParams, user?.id);

  // Backward/forward compatible: some endpoints return `{ data: ... }` while others return the object directly.
  // Also guards against cached/empty responses (e.g. a 304 with no usable body).
  const rawMeta: any = (metaQuery.data as any)?.data ?? metaQuery.data;
  const meta =
    rawMeta && typeof rawMeta === "object"
      ? rawMeta
      : { apps: [], concepts: [], difficulties: [] };
  const exercises = exercisesQuery.data?.data || [];
  const pagination = exercisesQuery.data?.pagination || {
    total: 0,
    page,
    totalPages: 1,
  };

  const apps = useMemo(() => getAppsFromMeta(meta), [meta]);

  const showCount = exercises.length;
  const totalCount = pagination.total;

  return (
    <div className="grid grid-cols-1 gap-8 max-w-[1440px] mx-auto mt-12">
      <section className="arena-bg-low rounded-xl p-6 flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div
            data-tour="challenges.search"
            className="flex-1 min-w-[300px] max-w-[49%]"
          >
            <SearchInput
              value={searchQuery}
              onChange={(v) => setParam("q", v)}
              onClear={() => setParam("q", "")}
            />
          </div>

          <div data-tour="challenges.filters.status">
            <SegmentedControl
              label="Status"
              options={[...statusOptions]}
              value={filterStatus as any}
              onChange={(s) => setParam("status", String(s))}
              getText={(s) => toStatusLabel(String(s))}
            />
          </div>

          <div data-tour="challenges.filters.difficulty">
            <SegmentedControl
              label="Difficulty"
              options={[...difficultyOptions]}
              value={filterDiff as any}
              onChange={(d) => setParam("diff", String(d))}
              getText={(d) =>
                String(d) === "All"
                  ? "All"
                  : String(d).toUpperCase()[0] + String(d).slice(1)
              }
            />
          </div>
        </div>

        <div className="flex w-full items-end gap-4 pt-4 border-t arena-border-divider">
          <Select
            label="App Type"
            options={apps}
            value={filterApps}
            isMulti
            onChange={(v) =>
              setParam(
                "app",
                Array.isArray(v) && v.length ? v.join(",") : null,
              )
            }
            placeholder="All Apps"
          />
          <Select
            label="Concepts"
            options={meta.concepts || []}
            value={filterConcepts}
            isMulti
            onChange={(next) =>
              setParam(
                "concepts",
                Array.isArray(next) && next.length ? next.join(",") : null,
              )
            }
            placeholder="Select concepts..."
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-sm font-bold arena-text-outline">
            Showing <span className="arena-text-on-surface">{showCount}</span> of{" "}
            <span className="arena-text-on-surface">{totalCount}</span> exercises
          </span>
        </div>

        <div className="flex flex-col gap-3" data-tour="challenges.list">
          {exercises.map((ex) => (
            <ChallengeRow
              key={ex.id}
              exercise={ex}
              search={searchParams.toString()}
            />
          ))}
        </div>

        <div data-tour="challenges.pagination">
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPage={(p) => {
              setParam("page", String(p));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </section>
    </div>
  );
}
