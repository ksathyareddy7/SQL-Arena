import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type AuthUser = {
  id: number;
  username?: string;
  [key: string]: unknown;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("sql_arena_user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Cleanup legacy solution unlock keys (unlocking is server-side now).
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith("solutions_unlocked_")) {
          localStorage.removeItem(k);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (userData: AuthUser) => {
    localStorage.setItem("sql_arena_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("sql_arena_user");
    setUser(null);
  };

  useEffect(() => {
    const onLogout = () => setUser(null);
    window.addEventListener("sql_arena:logout", onLogout);
    return () => window.removeEventListener("sql_arena:logout", onLogout);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, logout, isAuthenticated: !!user }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
