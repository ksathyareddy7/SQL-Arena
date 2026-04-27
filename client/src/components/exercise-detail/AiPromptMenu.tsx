import {
  Bot,
  Copy,
  MessageCircleQuestion,
  Bug,
  FlaskConical,
  Lightbulb,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { AI_PROMPT_TYPES, buildAiPrompt } from "@/utils/aiPrompts";
import { copyToClipboard } from "@/utils/clipboard";

export type AiPromptMenuProps = {
  exercise?: any;
  userQuery?: string;
  lastRunQuery?: string;
  result?: any;
  submitMessage?: any;
  columnWarning?: string | null;
  explainPlan?: any;
  hints?: any;
};

export default function AiPromptMenu({
  exercise,
  userQuery,
  lastRunQuery,
  result,
  submitMessage,
  columnWarning,
  explainPlan,
  hints,
}: AiPromptMenuProps) {
  const copyPrompt = async (type) => {
    try {
      if (!exercise) {
        throw new Error("Missing exercise context.");
      }
      const prompt = buildAiPrompt({
        type,
        exercise,
        userQuery,
        lastRunQuery,
        result,
        submitMessage,
        columnWarning,
        explainPlan,
      });
      await copyToClipboard(prompt);
      toast.success("AI prompt copied", {
        description: "Paste it into any AI chat app.",
      });
    } catch (e) {
      toast.error("Copy failed", {
        description: e?.message || "Unable to copy prompt to clipboard.",
      });
    }
  };

  const hasError = !!result?.error;
  const isWrong = submitMessage?.isCorrect === false;
  const canOptimize =
    !!userQuery?.trim() &&
    !!lastRunQuery &&
    lastRunQuery === userQuery &&
    !result?.error;

  const hintList = Array.isArray(hints) ? hints : [];
  const allHintsRevealed =
    hintList.length > 0 && hintList.every((h) => h && h.revealed);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-sm border-2",
          "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 hover:text-blue-800",
          "dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50 dark:hover:text-blue-200",
        )}
        title="Copy an AI prompt with question + schema context"
        type="button"
      >
        <Bot className="w-4 h-4 mr-2" />
        AI Prompt
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Copy prompt for…</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => copyPrompt(AI_PROMPT_TYPES.SOLVE)}
        >
          <Info className="w-4 h-4 mr-2 text-blue-500" />
          Help me solve
          <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
            <Copy className="w-3.5 h-3.5" />
          </span>
        </DropdownMenuItem>

        {hasError && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => copyPrompt(AI_PROMPT_TYPES.DEBUG_ERROR)}
          >
            <Bug className="w-4 h-4 mr-2 text-red-500" />
            Debug my error
            <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">
              <Copy className="w-3.5 h-3.5" />
            </span>
          </DropdownMenuItem>
        )}

        {isWrong && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => copyPrompt(AI_PROMPT_TYPES.WRONG_RESULT)}
          >
            <MessageCircleQuestion className="w-4 h-4 mr-2 text-red-500" />
            Why is my result wrong?
            <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">
              <Copy className="w-3.5 h-3.5" />
            </span>
          </DropdownMenuItem>
        )}

        {canOptimize && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => copyPrompt(AI_PROMPT_TYPES.OPTIMIZE)}
          >
            <FlaskConical className="w-4 h-4 mr-2 text-blue-500" />
            Help me optimize query
            <span className="ml-4 text-xs text-slate-500 dark:text-slate-400">
              <Copy className="w-3.5 h-3.5" />
            </span>
          </DropdownMenuItem>
        )}

        {allHintsRevealed && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => copyPrompt(AI_PROMPT_TYPES.HINTS_ONLY)}
          >
            <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
            Get new hint
            <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
              <Copy className="w-3.5 h-3.5" />
            </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
