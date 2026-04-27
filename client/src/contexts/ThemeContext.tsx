import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (nextTheme: ThemeMode) => void;
};

const ThemeProviderContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
} & Record<string, unknown>) {
  const [theme, setTheme] = useState<ThemeMode>(
    () =>
      (localStorage.getItem(storageKey) as ThemeMode | null) ||
      (defaultTheme as ThemeMode),
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const memoValue = useMemo(
    () => ({
      theme,
      setTheme: (nextTheme: ThemeMode) => {
        localStorage.setItem(storageKey, nextTheme);
        setTheme(nextTheme);
      },
    }),
    [theme, storageKey],
  );

  return (
    <ThemeProviderContext.Provider {...props} value={memoValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

