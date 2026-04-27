export const clampPercent = (value: unknown) => {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return v;
};

export const statusTone = (status: unknown) => {
  if (status === "completed") return "text-emerald-600 dark:text-emerald-400";
  if (status === "in progress") return "text-amber-600 dark:text-amber-400";
  return "text-muted-foreground";
};
