import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Toaster as Sonner } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const resolvedTheme =
    theme === "system"
      ? window?.matchMedia?.("(prefers-color-scheme: dark)")?.matches
        ? "dark"
        : "light"
      : theme;

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group pointer-events-auto flex w-full items-start gap-3 rounded-lg border px-4 py-3 shadow-lg " +
            "bg-popover text-popover-foreground border-border " +
            "data-[type=success]:border-emerald-200 data-[type=success]:bg-emerald-50 data-[type=success]:text-emerald-950 " +
            "data-[type=error]:border-rose-200 data-[type=error]:bg-rose-50 data-[type=error]:text-rose-950 " +
            "data-[type=info]:border-amber-200 data-[type=info]:bg-amber-50 data-[type=info]:text-amber-950 " +
            // Dark mode: keep toast backgrounds opaque (not translucent) for better readability.
            "dark:data-[type=success]:border-emerald-900/60 dark:data-[type=success]:bg-emerald-950 dark:data-[type=success]:text-emerald-50 " +
            "dark:data-[type=error]:border-rose-900/60 dark:data-[type=error]:bg-rose-950 dark:data-[type=error]:text-rose-50 " +
            "dark:data-[type=info]:border-amber-900/60 dark:data-[type=info]:bg-amber-950 dark:data-[type=info]:text-amber-50",
          title:
            "text-sm font-semibold leading-5 " +
            "group-data-[type=success]:text-emerald-950 group-data-[type=error]:text-rose-950 group-data-[type=info]:text-amber-950 " +
            "dark:group-data-[type=success]:text-emerald-50 dark:group-data-[type=error]:text-rose-50 dark:group-data-[type=info]:text-amber-50",
          description:
            "text-sm leading-5 text-muted-foreground " +
            "group-data-[type=success]:text-emerald-800 group-data-[type=error]:text-rose-800 group-data-[type=info]:text-amber-800 " +
            "dark:group-data-[type=success]:text-emerald-200 dark:group-data-[type=error]:text-rose-200 dark:group-data-[type=info]:text-amber-200",
          icon:
            "mt-0.5 " +
            "group-data-[type=success]:text-emerald-600 group-data-[type=error]:text-rose-600 group-data-[type=info]:text-amber-700 " +
            "dark:group-data-[type=success]:text-emerald-400 dark:group-data-[type=error]:text-rose-400 dark:group-data-[type=info]:text-amber-300",
        },
        duration: 6000,
      }}
      {...props}
    />
  );
};

export { Toaster };
