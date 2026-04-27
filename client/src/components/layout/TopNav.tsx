import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, LogOut, CircleHelp } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import NavLink from "./NavLink";
import { getTourIdForPath } from "@/tours/registry";
import { useTour } from "@/contexts/TourContext";
import brandIcon from "@/assets/sql-arena.svg";
import IconButton from "@/components/common/IconButton";

export default function TopNav() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const { startTour, stopTour, isRunning, activeTourId } = useTour();
  const tourId = getTourIdForPath(location.pathname);

  return (
    <header className="w-full arena-bg-lowest sticky top-0 z-50">
      <div className="mx-auto px-6 pt-2 h-[64px] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={brandIcon} alt="SQL Arena" className="w-10 h-10" />

            <span className="font-bold text-xl tracking-tight arena-text-primary dark:text-white">
              SQL Arena
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/" end extraActivePaths={["/exercises/*"]}>
            Exercises
          </NavLink>
          <NavLink to="/tracks">Learn</NavLink>
          <NavLink to="/mock-interviews">Mock Interview</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5 text-slate-600 dark:text-slate-300">
            <IconButton
              aria-label="Start tour"
              disabled={!tourId}
              tone="warning"
              className="disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={() => {
                if (isRunning && activeTourId === tourId) {
                  stopTour();
                } else {
                  startTour(tourId);
                }
              }}
              title="Page tour"
            >
              <CircleHelp className="w-6 h-6" />
            </IconButton>
            <IconButton
              aria-label="Toggle Dark Mode"
              tone="primary"
              className="transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle themes"
            >
              {theme === "dark" ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </IconButton>
            <IconButton
              aria-label="Logout"
              tone="danger"
              className="transition-colors"
              onClick={logout}
              title="Logout"
            >
              <LogOut className="w-6 h-6" />
            </IconButton>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />

          <div className="flex items-center gap-3">
            <span className="text-slate-700 dark:text-slate-200 font-medium text-[15px]">
              {user?.username}
            </span>
            <div className="w-9 h-9 rounded-full bg-[#dbeafe] dark:bg-blue-900/40 flex items-center justify-center arena-text-primary font-bold text-lg">
              {user?.username?.slice(0, 1)?.toLowerCase() || "u"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
