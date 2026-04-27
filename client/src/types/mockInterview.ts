export type View = "question" | "schema" | "hints";

export type ActionOutcome =
  | {
      kind: "run" | "submit";
      ok: boolean;
      label: "Success 🚀" | "Failed 💥";
      detail?: string;
      ts: number;
    }
  | null;

