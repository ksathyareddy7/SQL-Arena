import Editor from "@monaco-editor/react";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

type SQLInputProps = {
  value: string;
  onChange: (next: string) => void;
  schemas?: any[];
  relationships?: any[];
  onEditorFocus?: () => void;
  disableAutocomplete?: boolean;
  readOnly?: boolean;
  className?: string;
};

const SQL_KEYWORDS = [
  "SELECT",
  "FROM",
  "WHERE",
  "JOIN",
  "INNER",
  "LEFT",
  "RIGHT",
  "FULL",
  "CROSS",
  "LATERAL",
  "ON",
  "USING",
  "GROUP BY",
  "HAVING",
  "ORDER BY",
  "LIMIT",
  "OFFSET",
  "DISTINCT",
  "AS",
  "AND",
  "OR",
  "NOT",
  "IN",
  "EXISTS",
  "BETWEEN",
  "LIKE",
  "ILIKE",
  "IS NULL",
  "IS NOT NULL",
  "CASE",
  "WHEN",
  "THEN",
  "ELSE",
  "END",
  "WITH",
  "UNION",
  "UNION ALL",
  "INTERSECT",
  "EXCEPT",
  "NULLS FIRST",
  "NULLS LAST",
  "OVER",
  "PARTITION BY",
  "WINDOW",
];

const stripSqlLiteralsAndComments = (sql = "") => {
  let s = String(sql);
  s = s.replace(/\/\*[\s\S]*?\*\//g, " ");
  s = s.replace(/--[^\n]*$/gm, " ");
  s = s.replace(/(\$[a-zA-Z0-9_]*\$)[\s\S]*?\1/g, " ");
  s = s.replace(/'(?:[^']|'{2})*'/g, " ");
  return s;
};

const buildAliasMap = ({ sql, tableNames }) => {
  const cleaned = stripSqlLiteralsAndComments(sql);
  const tableSet = new Set(tableNames.map((t) => String(t).toLowerCase()));

  const aliasToTable = new Map();
  for (const t of tableNames) {
    aliasToTable.set(String(t).toLowerCase(), String(t));
  }

  // Very lightweight FROM/JOIN alias detection:
  //   FROM posts p
  //   JOIN users AS u
  const re =
    /\b(from|join)\s+([a-z_][a-z0-9_]*)\s+(?:as\s+)?([a-z_][a-z0-9_]*)/gi;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const table = String(m[2] || "").toLowerCase();
    const alias = String(m[3] || "").toLowerCase();
    if (tableSet.has(table)) {
      aliasToTable.set(alias, table);
    }
  }

  return aliasToTable;
};

const toColumns = (columns) => {
  if (!Array.isArray(columns)) return [];
  return columns
    .map((c) => (c && typeof c === "object" ? c.name : c))
    .filter((c) => typeof c === "string" && c.length > 0);
};

export default function SQLInput({
  value,
  onChange,
  schemas = [],
  relationships = [],
  onEditorFocus,
  disableAutocomplete = false,
  readOnly = false,
  className,
}: SQLInputProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const completionDataRef = useRef({
    tables: new Map(), // lowerTable -> { name, columns[] }
    tableNames: [],
    relationships: [],
  });
  const providerDisposableRef = useRef(null);
  const monacoRef = useRef(null);
  const editorRef = useRef(null);
  const editorDisposablesRef = useRef([]);

  const normalizedSchemas = useMemo(() => {
    if (!Array.isArray(schemas)) return [];
    return schemas
      .map((t) => ({
        table_name: String(t?.table_name || ""),
        columns: toColumns(t?.columns),
      }))
      .filter((t) => t.table_name);
  }, [schemas]);

  useEffect(() => {
    const tables = new Map();
    for (const t of normalizedSchemas) {
      tables.set(String(t.table_name).toLowerCase(), {
        name: t.table_name,
        columns: t.columns,
      });
    }
    completionDataRef.current = {
      tables,
      tableNames: normalizedSchemas.map((t) => t.table_name),
      relationships: Array.isArray(relationships) ? relationships : [],
    };
  }, [normalizedSchemas, relationships]);

  useEffect(() => {
    return () => {
      if (providerDisposableRef.current) {
        try {
          providerDisposableRef.current.dispose();
        } catch {
          // ignore
        }
        providerDisposableRef.current = null;
      }

      if (Array.isArray(editorDisposablesRef.current)) {
        for (const d of editorDisposablesRef.current) {
          try {
            d?.dispose?.();
          } catch {
            // ignore
          }
        }
      }
      editorDisposablesRef.current = [];
    };
  }, []);

  const registerProvider = (monaco) => {
    if (!monaco) return;
    if (disableAutocomplete) return;
    if (providerDisposableRef.current) return;

    providerDisposableRef.current =
      monaco.languages.registerCompletionItemProvider("sql", {
        triggerCharacters: [".", " "],
        provideCompletionItems: (model, position) => {
          const data = completionDataRef.current;
          const linePrefix = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const dotMatch = /([a-z_][a-z0-9_]*)\.\s*$/i.exec(linePrefix);
          const aliasMap = buildAliasMap({
            sql: model.getValue(),
            tableNames: data.tableNames,
          });

          const resolveTableForPrefix = (prefix) => {
            const k = String(prefix || "").toLowerCase();
            const mapped = aliasMap.get(k);
            const tableKey = String(mapped || k).toLowerCase();
            return data.tables.get(tableKey) || null;
          };

          // Context: after "<tableOrAlias>."
          if (dotMatch) {
            const t = resolveTableForPrefix(dotMatch[1]);
            if (!t) return { suggestions: [] };

            const suggestions = t.columns.map((col) => ({
              label: col,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: col,
              range,
              detail: t.name,
              sortText: `0_${col}`,
            }));

            return { suggestions };
          }

          const suggestions = [];

          // Keyword suggestions
          for (const kw of SQL_KEYWORDS) {
            suggestions.push({
              label: kw,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: kw,
              range,
              detail: "keyword",
              sortText: `0_${kw}`,
            });
          }

          // Table suggestions
          for (const t of data.tables.values()) {
            suggestions.push({
              label: t.name,
              kind: monaco.languages.CompletionItemKind.Struct,
              insertText: t.name,
              range,
              detail: "table",
              sortText: `1_${t.name}`,
            });
          }

          // Column suggestions (qualified)
          for (const t of data.tables.values()) {
            for (const col of t.columns) {
              suggestions.push({
                label: `${t.name}.${col}`,
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: `${t.name}.${col}`,
                range,
                detail: "column",
                sortText: `2_${t.name}_${col}`,
              });
            }
          }

          // (Optional) plain column suggestions (only when unambiguous)
          const colOwners = new Map(); // col -> Set<table>
          const colOriginal = new Map(); // colLower -> original casing
          for (const t of data.tables.values()) {
            for (const col of t.columns) {
              const key = String(col).toLowerCase();
              if (!colOwners.has(key)) colOwners.set(key, new Set());
              colOwners.get(key).add(t.name);
              if (!colOriginal.has(key)) colOriginal.set(key, col);
            }
          }
          for (const [colKey, owners] of colOwners.entries()) {
            if (owners.size !== 1) continue;
            const col = colOriginal.get(colKey) || colKey;
            suggestions.push({
              label: String(col),
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: String(col),
              range,
              detail: "column",
              sortText: `3_${String(col)}`,
            });
          }

          return { suggestions };
        },
      });
  };

  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-400",
        className,
      )}
    >
      <Editor
        height="100%"
        defaultLanguage="sql"
        theme={isDark ? "vs-dark" : "light"}
        value={value}
        onChange={(next) => onChange(next ?? "")}
        onMount={(_editor, monaco) => {
          editorRef.current = _editor;
          monacoRef.current = monaco;
          registerProvider(monaco);

          // Engagement signals for timer/inactivity:
          // - first focus / click inside editor
          // - typing (model content change)
          const disposables = [];
          try {
            disposables.push(
              _editor.onDidFocusEditorWidget(() => {
                onEditorFocus?.();
              }),
            );
          } catch {
            // ignore (Monaco API should exist)
          }

          editorDisposablesRef.current = disposables;
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
          overviewRulerLanes: 0,
          folding: true,
          tabSize: 2,
          renderWhitespace: "selection",
          automaticLayout: true,
          readOnly,
          quickSuggestions: disableAutocomplete ? false : true,
          suggestOnTriggerCharacters: disableAutocomplete ? false : true,
          wordBasedSuggestions: disableAutocomplete ? "off" : "currentDocument",
          inlineSuggest: { enabled: disableAutocomplete ? false : true },
        }}
      />
    </div>
  );
}
