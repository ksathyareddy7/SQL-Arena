import { format as formatSqlImpl } from "sql-formatter";

export const normalizeColumns = (cols) =>
  (Array.isArray(cols) ? cols : [])
    .map((c) => String(c).trim().toLowerCase())
    .filter(Boolean);

export const diffColumns = (expectedCols, actualCols) => {
  const expected = normalizeColumns(expectedCols);
  const actual = normalizeColumns(actualCols);
  const missing = expected.filter((c) => !actual.includes(c));
  const extras = actual.filter((c) => !expected.includes(c));
  return { missing, extras };
};

export const columnWarningText = ({ missing, extras }) => {
  if ((!missing || missing.length === 0) && (!extras || extras.length === 0))
    return null;
  const parts = [];
  if (missing?.length) parts.push(`Missing: ${missing.join(", ")}`);
  if (extras?.length) parts.push(`Extra: ${extras.join(", ")}`);
  return parts.join(" • ");
};

export const formatSql = (sql) =>
  formatSqlImpl(sql, { language: "postgresql", keywordCase: "upper" });

