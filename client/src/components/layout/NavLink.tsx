import { NavLink as RouterNavLink, matchPath, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import React from "react";

type NavLinkProps = {
  to: string;
  end?: boolean;
  children: React.ReactNode;
  extraActivePaths?: string[];
};

export default function NavLink({
  to,
  end,
  children,
  extraActivePaths = [],
}: NavLinkProps) {
  const location = useLocation();
  const isExtraActive =
    extraActivePaths.length > 0 &&
    extraActivePaths.some((p) =>
      p.includes("*")
        ? location.pathname.startsWith(p.replace(/\*.*$/, ""))
        : !!matchPath({ path: p, end: false }, location.pathname),
    );

  return (
    <RouterNavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "relative px-4 text-[16px] font-medium text-slate-600 hover:text-[var(--arena-primary)] transition-colors",
          "dark:text-white dark:hover:text-[var(--arena-nav-active)]",
          (isActive || isExtraActive) &&
            "font-bold text-[var(--arena-nav-active)] dark:text-[var(--arena-nav-active)] after:content-[''] after:absolute after:left-0 after:-bottom-[16px] after:h-[2px] after:w-full after:bg-[var(--arena-nav-underline)] dark:after:bg-[var(--arena-nav-underline)]",
        )
      }
    >
      {children}
    </RouterNavLink>
  );
}
