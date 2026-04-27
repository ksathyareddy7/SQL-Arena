export const formatDuration = (totalSeconds: number) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  const hh = Math.floor(mm / 60);
  const m2 = mm % 60;

  if (hh > 0) {
    return `${String(hh).padStart(2, "0")}:${String(m2).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
};

export const secondsRemaining = (endsAt: string | null | undefined) => {
  if (!endsAt) return 0;
  const ms = Date.parse(endsAt);
  if (Number.isNaN(ms)) return 0;
  return Math.max(0, Math.floor((ms - Date.now()) / 1000));
};
