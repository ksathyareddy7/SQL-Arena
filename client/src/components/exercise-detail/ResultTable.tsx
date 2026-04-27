import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const normalizeColumns = (fields) => {
  if (!Array.isArray(fields)) return [];
  return fields
    .map((f) => {
      if (!f) return null;
      if (typeof f === "string") return { name: f };
      if (typeof f === "object") {
        return { name: f.name || f.column_name || f.field || "" };
      }
      return null;
    })
    .filter((c) => c?.name);
};

export default function ResultTable({
  rows,
  fields,
  error,
  expectedResultFormat = false,
  variant = "default",
}) {
  if (error) {
    return (
      <div className="rounded-md border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-900/20 p-4 text-rose-700 dark:text-rose-200 text-sm">
        {error}
      </div>
    );
  }

  const columns = normalizeColumns(fields);
  if (columns.length === 0) return null;
  if (!expectedResultFormat && !Array.isArray(rows)) return null;
  const safeRows = Array.isArray(rows) ? rows : [];

  if (variant === "v2") {
    return (
      <div className="overflow-x-auto border border-[color:rgb(194_198_214/0.20)] dark:border-[color:rgb(42_51_66/0.7)] bg-[var(--arena-surface-container-lowest)]">
        <Table>
          <TableHeader className="bg-[color:rgb(239_244_255/0.95)] dark:bg-[color:rgb(20_30_45/0.85)]">
            <TableRow className="border-b border-[color:rgb(194_198_214/0.15)] dark:border-[color:rgb(42_51_66/0.7)]">
              {columns.map((c) => (
                <TableHead
                  key={c.name}
                  className="py-5 px-5 text-[12px] font-black uppercase tracking-[0.18em] text-[var(--arena-on-surface)] opacity-70 dark:opacity-90"
                >
                  {c.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {safeRows.map((row, idx) => (
              <TableRow
                key={idx}
                className={`border-b border-[color:rgb(194_198_214/0.10)] dark:border-[color:rgb(42_51_66/0.6)] ${
                  idx % 2 === 1
                    ? "bg-[color:rgb(11_28_48/0.025)] dark:bg-[color:rgb(255_255_255/0.02)]"
                    : ""
                }`}
              >
                {columns.map((c) => (
                  <TableCell
                    key={c.name}
                    className="px-5 py-5 text-[16px] font-mono text-[var(--arena-on-surface)]"
                  >
                    {row?.[c.name] === null || row?.[c.name] === undefined
                      ? ""
                      : String(row[c.name])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-x-auto dark:border-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.name}>{c.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeRows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((c) => (
                <TableCell key={c.name}>
                  {row?.[c.name] === null || row?.[c.name] === undefined
                    ? ""
                    : String(row[c.name])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
