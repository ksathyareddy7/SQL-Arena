import type { ReactNode } from "react";
import TopNav from "./TopNav";
import TourProvider from "@/contexts/TourContext";
import BadgesUnlockedDialogProvider from "@/contexts/BadgesUnlockedDialogContext";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="arena-bg-surface arena-text-on-surface min-h-screen">
      <TourProvider>
        <BadgesUnlockedDialogProvider>
          <TopNav />
          <main className="mx-auto min-h-screen">{children}</main>
        </BadgesUnlockedDialogProvider>
      </TourProvider>
    </div>
  );
}
