export const DEFAULT_APPS = [
  "social",
  "ecommerce",
  "food",
  "ride",
  "movies",
  "bank",
  "realestate",
  "hospital",
  "education",
  "chat",
] as const;

export function normalizeAppName(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

export function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function getAppsFromMeta(rawMeta: any): string[] {
  const apps = Array.isArray(rawMeta?.apps) ? rawMeta.apps : [];
  const normalized = apps
    .map(normalizeAppName)
    .filter((v): v is string => Boolean(v));
  return normalized.length ? uniq<string>(normalized).sort() : [...DEFAULT_APPS];
}
