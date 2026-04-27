import { isValidElement, memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Quote, Copy } from "lucide-react";
import { toast } from "sonner";

import Mermaid from "@/components/common/Mermaid";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/clipboard";

type Props = {
  content: string;
  className?: string;
  variant?: "card" | "bare";
};

const BODY_TEXT =
  "text-[color:rgb(11_28_48/0.82)] dark:text-[color:rgb(244_244_245/0.92)]";

const isFence = (line: string) => /^(```|~~~)/.test(line.trim());
const isHr = (line: string) => line.trim() === "---";

export function splitMarkdownIntoSections(markdown: string): string[] {
  const lines = String(markdown || "").split(/\r?\n/);
  let inFence = false;

  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (isFence(line)) {
      inFence = !inFence;
      current.push(line);
      continue;
    }

    if (!inFence && isHr(line)) {
      const chunk = current.join("\n").trim();
      if (chunk) sections.push(chunk);
      current = [];
      continue;
    }

    current.push(line);
  }

  const tail = current.join("\n").trim();
  if (tail) sections.push(tail);

  return sections.length ? sections : [String(markdown || "")];
}

const hastText = (node: any): string => {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node)) return node.map(hastText).join("");
  if (Array.isArray(node.children)) return node.children.map(hastText).join("");
  return "";
};

const codeMeta = (lang: string | undefined) => {
  const l = String(lang || "").toLowerCase();
  if (!l) return { filename: "SNIPPET.TXT", dialect: "" };
  if (l === "sql")
    return { filename: "QUERY.SQL", dialect: "SQL Dialect: PostgreSQL" };
  return { filename: `SNIPPET.${l.toUpperCase()}`, dialect: `Language: ${l}` };
};

function InlineCode({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "rounded px-2 py-0.5",
        // Light blue “chip” background for inline snippets (matches V2 lesson styling).
        "bg-[#EFF4FF] text-[#0058BE]",
        "dark:bg-[color:rgb(0_88_190/0.18)] dark:text-[color:rgb(186_220_255/0.95)]",
        "ring-1 ring-[color:rgb(0_88_190/0.10)] dark:ring-[color:rgb(0_88_190/0.25)]",
        "font-mono font-bold text-[0.95em] leading-none",
        className,
      )}
    >
      {children}
    </code>
  );
}

function CopySnippetButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await copyToClipboard(text);
          toast.success("Copied", {
            description: "Snippet copied to clipboard.",
          });
        } catch (e: any) {
          toast.error("Copy failed", {
            description: e?.message || "Unable to copy snippet.",
          });
        }
      }}
      className="text-xs font-bold text-[var(--arena-primary)] uppercase tracking-wider flex items-center gap-1 hover:text-[var(--arena-primary-solid)]"
      title="Copy Snippet"
    >
      <Copy className="h-4 w-4" />
      Copy Snippet
    </button>
  );
}

function CodeWell({
  lang,
  raw,
  children,
}: {
  lang?: string;
  raw: string;
  children: any;
}) {
  const { filename, dialect } = codeMeta(lang);
  return (
    <div className="not-prose my-6">
      <div className="bg-[var(--arena-surface-container-low)] p-5 rounded-xl overflow-hidden">
        <div className="flex justify-between items-center mb-3 px-2">
          <span className="text-[0.7rem] font-bold tracking-widest text-[var(--arena-outline)] uppercase">
            {filename}
          </span>
          <span className="text-[0.7rem] font-medium text-[var(--arena-outline)] uppercase">
            {dialect}
          </span>
        </div>

      <div className="bg-[var(--arena-surface-container-lowest)] p-6 rounded-lg border border-[color:rgb(194_198_214/0.10)] dark:border-[color:rgb(42_51_66/0.7)] font-mono text-sm leading-relaxed overflow-x-auto">
          <pre className="m-0 whitespace-pre">{children}</pre>
        </div>

        <div className="mt-4 flex justify-end">
          <CopySnippetButton text={raw} />
        </div>
      </div>
    </div>
  );
}

function BlockQuote({ children }: { children: any }) {
  return (
    <blockquote
      className={cn(
        "relative border-l-4 border-[var(--arena-primary)] bg-[var(--arena-surface-container-low)] p-8 rounded-r-xl not-prose my-6",
        "[&_p]:text-xl [&_p]:font-medium [&_p]:text-[var(--arena-on-surface)] [&_p]:leading-snug",
        "[&_footer]:mt-4 [&_footer]:text-sm [&_footer]:font-bold [&_footer]:text-[var(--arena-secondary)] [&_footer]:uppercase [&_footer]:tracking-widest",
      )}
    >
      <span className="absolute -top-4 -left-3 rounded-full p-1 bg-[var(--arena-surface-container-lowest)] border border-[color:rgb(194_198_214/0.10)] dark:border-[color:rgb(42_51_66/0.7)]">
        <Quote className="h-4 w-4 text-[var(--arena-primary)]" />
      </span>
      {children}
    </blockquote>
  );
}

function UnorderedList({ children }: { children: any }) {
  const items = useMemo(() => {
    const arr = (Array.isArray(children) ? children : [children]).filter(
      Boolean,
    );
    return arr.filter((c: any) => isValidElement(c));
  }, [children]);

  return (
    <div className="not-prose my-5">
      <ul className="space-y-3">
        {items.map((liEl: any, idx: number) => {
          return (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--arena-primary)] mt-2" />
              <span className={BODY_TEXT}>
                {liEl.props.children}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function OrderedList({ children, start }: { children: any; start?: number }) {
  const items = useMemo(() => {
    const arr = (Array.isArray(children) ? children : [children]).filter(
      Boolean,
    );
    return arr.filter((c: any) => isValidElement(c));
  }, [children]);

  const base = Number(start) || 1;

  return (
    <div className="not-prose my-5">
      <ol className="space-y-3">
        {items.map((liEl: any, idx: number) => {
          const n = base + idx;
          return (
            <li key={idx} className="flex items-start gap-3">
              <span className="font-bold text-[var(--arena-primary)] min-w-[1.5rem]">
                {n}.
              </span>
              <span className={BODY_TEXT}>
                {liEl.props.children}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function Table({ children }: { children: any }) {
  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
}

function MarkdownRenderer({ content, className, variant = "card" }: Props) {
  return (
    <div
      className={cn(
        "markdown",
        variant === "card"
          ? cn(
              "rounded-xl bg-[var(--arena-surface-container-lowest)] p-8",
              "border border-[color:rgb(194_198_214/0.12)] dark:border-[color:rgb(42_51_66/0.7)]",
            )
          : null,
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1({ children }) {
            return (
              <div className="mb-6 border-b border-[var(--arena-surface-container)] pb-4">
                <h1 className="text-4xl font-extrabold tracking-tight [&_code]:text-[0.9em] [&_code]:align-baseline">
                  {children}
                </h1>
              </div>
            );
          },
          h2({ children }) {
            return (
              <h2 className="mt-12 mb-4 text-3xl font-bold tracking-tight [&_code]:text-[0.9em] [&_code]:align-baseline">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="mt-10 mb-3 text-2xl font-bold tracking-tight [&_code]:text-[0.9em] [&_code]:align-baseline">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="mt-8 mb-2 text-xl font-semibold [&_code]:text-[0.9em] [&_code]:align-baseline">
                {children}
              </h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className="mt-8 mb-2 text-lg font-semibold uppercase text-[var(--arena-outline)] [&_code]:text-[0.9em] [&_code]:align-baseline">
                {children}
              </h5>
            );
          },
          h6({ children }) {
            return (
              <h6 className="mt-6 mb-2 text-sm font-bold uppercase tracking-widest text-[var(--arena-secondary)] [&_code]:text-[0.9em] [&_code]:align-baseline">
                {children}
              </h6>
            );
          },
          hr() {
            return null;
          },
          p({ children }) {
            return (
              <p className={cn("my-4 text-lg leading-relaxed", BODY_TEXT)}>
                {children}
              </p>
            );
          },
          a({ children, href }) {
            return (
              <a
                href={href}
                className="text-[var(--arena-primary)] font-semibold underline decoration-2 underline-offset-4 hover:text-[var(--arena-primary-solid)] transition-all"
              >
                {children}
              </a>
            );
          },
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const lang = match?.[1];

            // `react-markdown` typically passes `inline`, but treat short, single-line
            // code without a language as inline as a fallback.
            const text = String(children ?? "");
            const isInline =
              inline === true ||
              (inline !== false && !lang && !text.includes("\n"));

            if (isInline) {
              return (
                <InlineCode className={className} {...props}>
                  {children}
                </InlineCode>
              );
            }

            if (lang === "mermaid") {
              const chartText = String(children).replace(/\n$/, "");
              return (
                <div className="not-prose my-4 flex justify-center overflow-x-auto">
                  <Mermaid chart={chartText} />
                </div>
              );
            }

            return (
              <code className={cn("hljs", className)} {...props}>
                {children}
              </code>
            );
          },
          pre({ node, children }: any) {
            const raw = hastText(node).replace(/\n$/, "");
            const codeEl = (
              Array.isArray(children) ? children : [children]
            ).find((c: any) => isValidElement(c)) as any;
            const cls = String(codeEl?.props?.className || "");
            const match = /language-(\w+)/.exec(cls);
            const lang = match?.[1];

            if (String(lang || "").toLowerCase() === "mermaid") {
              return (
                <div className="not-prose my-4 flex justify-center overflow-x-auto rounded-xl border border-[color:rgb(194_198_214/0.10)] dark:border-[color:rgb(42_51_66/0.7)] bg-[var(--arena-surface-container-lowest)] p-3">
                  <Mermaid chart={raw} />
                </div>
              );
            }

            return (
              <CodeWell lang={lang} raw={raw}>
                {children}
              </CodeWell>
            );
          },
          blockquote({ children }) {
            return <BlockQuote>{children}</BlockQuote>;
          },
          ul({ children }) {
            return <UnorderedList>{children}</UnorderedList>;
          },
          ol({ children, start }) {
            return <OrderedList start={start}>{children}</OrderedList>;
          },
          table({ children }) {
            return <Table>{children}</Table>;
          },
          thead({ children }) {
            return <thead>{children}</thead>;
          },
          tr({ children, ...props }) {
            return (
              <tr
                {...props}
                className={cn(
                  props?.className,
                  "border-b border-[var(--arena-surface-container)]",
                  (props as any)?.node?.tagName === "tr" ? "" : "",
                )}
              >
                {children}
              </tr>
            );
          },
          th({ children }) {
            return (
              <th className="px-6 py-4 text-sm font-bold text-[var(--arena-on-surface)] uppercase tracking-wider bg-[var(--arena-surface-container-low)]">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td
                className={cn(
                  "px-6 py-5 leading-relaxed [&_code]:text-xs [&_code]:font-bold",
                  BODY_TEXT,
                )}
              >
                {children}
              </td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Prevent re-rendering (and thus remounting Mermaid/code blocks) when the parent
// rerenders for unrelated reasons (e.g. scroll progress updates).
export default memo(MarkdownRenderer);
