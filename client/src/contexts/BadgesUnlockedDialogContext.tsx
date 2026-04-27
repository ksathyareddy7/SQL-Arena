import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ICONS } from "@/components/badges/badgeIcons";
import type { Badge } from "@/types/badges";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Ctx = {
  showUnlockedBadges: (badges: Badge[]) => void;
};

const BadgesUnlockedDialogContext = createContext<Ctx | null>(null);

export const useUnlockedBadgesDialog = () => {
  const ctx = useContext(BadgesUnlockedDialogContext);
  if (!ctx) {
    throw new Error("useUnlockedBadgesDialog must be used within provider");
  }
  return ctx;
};

const dedupeBySlug = (badges: Badge[]) => {
  const seen = new Set<string>();
  const out: Badge[] = [];
  for (const b of badges) {
    const slug = String(b?.slug || "");
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(b);
  }
  return out;
};

export default function BadgesUnlockedDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState<Badge[]>([]);

  const showUnlockedBadges = useCallback((badges: Badge[]) => {
    const list = Array.isArray(badges) ? badges : [];
    if (!list.length) return;
    setUnlocked((prev) => dedupeBySlug([...prev, ...list]));
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ showUnlockedBadges }), [showUnlockedBadges]);

  return (
    <BadgesUnlockedDialogContext.Provider value={value}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setUnlocked([]);
        }}
      >
        <DialogContent className="max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Badges unlocked</DialogTitle>
            <DialogDescription>
              You earned {unlocked.length} new badge
              {unlocked.length === 1 ? "" : "s"}.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-3">
            {unlocked.map((b) => {
              const icon = ICONS[b.icon_key];
              return (
                <div
                  key={b.slug}
                  className={cn(
                    "rounded-xl border p-4 flex items-start gap-3",
                    "bg-[var(--arena-surface-container-lowest)] border-[var(--arena-surface-container)] dark:border-white/20",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                      "bg-[color-mix(in_srgb,var(--arena-primary)_12%,transparent)]",
                    )}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-extrabold leading-5 arena-text-on-surface">
                      {b.title}
                    </div>
                    <div className="mt-1 text-sm leading-5 arena-text-outline">
                      {b.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </BadgesUnlockedDialogContext.Provider>
  );
}

