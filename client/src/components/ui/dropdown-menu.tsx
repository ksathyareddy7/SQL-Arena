import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";

type RootProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Root>;
type TriggerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger> & {
  className?: string;
};
type PositionerProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Positioner>;
type PopupProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Popup> & {
  className?: string;
};
type ItemProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> & {
  className?: string;
  inset?: boolean;
  disabled?: boolean;
};
type SeparatorProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator> & {
  className?: string;
};

function DropdownMenu(props: RootProps) {
  return <MenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger({ className, ...props }: TriggerProps) {
  return (
    <MenuPrimitive.Trigger
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  align = "end",
  sideOffset = 8,
  ...props
}: PopupProps & {
  align?: PositionerProps["align"];
  sideOffset?: number;
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        align={align}
        className="z-50"
      >
        <MenuPrimitive.Popup
          className={cn(
            "min-w-[220px] overflow-hidden rounded-md border border-slate-200 bg-white p-1 text-slate-900 shadow-md",
            "dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  disabled,
  ...props
}: ItemProps) {
  return (
    <MenuPrimitive.Item
      disabled={disabled}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "data-[highlighted]:bg-slate-100 data-[highlighted]:text-slate-900",
        "dark:data-[highlighted]:bg-slate-900/60 dark:data-[highlighted]:text-slate-50",
        disabled &&
          "pointer-events-none opacity-50 data-[highlighted]:bg-transparent dark:data-[highlighted]:bg-transparent",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({ className, ...props }: SeparatorProps) {
  return (
    <MenuPrimitive.Separator
      className={cn("my-1 h-px bg-slate-200 dark:bg-slate-800", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
