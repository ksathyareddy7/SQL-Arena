import React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function IconButton({
  tone = "default",
  className,
  ...props
}: ButtonProps & {
  tone?: "default" | "primary" | "warning" | "danger";
}) {
  const toneClass =
    tone === "danger"
      ? "hover:border-red-400 hover:text-red-400 dark:hover:border-red-400 dark:hover:text-red-400"
      : tone === "warning"
        ? "hover:border-yellow-400 hover:text-yellow-400 dark:hover:border-yellow-400 dark:hover:text-yellow-400"
        : tone === "primary"
          ? "hover:border-[var(--arena-primary)] hover:text-[var(--arena-primary)] dark:hover:border-[var(--arena-primary)] dark:hover:text-[var(--arena-primary)]"
          : "hover:border-[var(--arena-primary)] hover:text-[var(--arena-primary)] dark:hover:border-[var(--arena-primary)] dark:hover:text-[var(--arena-primary)]";

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className={cn(
        "rounded-sm border border-gray-200 hover:bg-transparent dark:border-gray-800 bg-transparent",
        toneClass,
        className,
      )}
      {...props}
    />
  );
}

