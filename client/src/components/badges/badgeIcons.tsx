import type { ReactNode } from "react";
import {
  ArrowDownUp,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Code,
  Flame,
  Funnel,
  Gauge,
  Link2,
  Lock,
  Search,
  Sparkles,
  Target,
  Timer,
  Trophy,
  Wand2,
  Zap,
  EyeOff,
  Sigma,
} from "lucide-react";

const className = "h-5 w-5 text-[var(--arena-primary)]";

export const ICON_COMPONENTS: Record<string, any> = {
  // onboarding / general
  spark: Sparkles,
  book: BookOpen,
  timer: Timer,

  // milestones
  target: Target,
  trophy: Trophy,
  flame: Flame,
  check: Check,

  // quality
  bolt: Zap,
  eye_off: EyeOff,
  lock: Lock,

  // concepts
  link: Link2,
  wand: Wand2,
  sigma: Sigma,
  search: Search,
  arrow_down_up: ArrowDownUp,
  funnel: Funnel,
  sparkles: Sparkles,
  calendar: Calendar,
  code: Code,
  check_circle: CheckCircle2,
  gauge: Gauge,
};

export const ICONS: Record<string, ReactNode> = {
  ...Object.fromEntries(
    Object.entries(ICON_COMPONENTS).map(([k, Comp]) => [
      k,
      <Comp key={k} className={className} />,
    ]),
  ),
};
