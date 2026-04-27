export type ExerciseActiveTab = "question" | "schema" | "hints" | "solutions";
export type ExerciseOutputTab = "results" | "explain" | "analyze";

export type ResultState = {
  rows: any[] | null;
  fields: any[] | null;
  error: string | null;
};

export type SubmitMessage = {
  isCorrect: boolean;
  text: string;
};
