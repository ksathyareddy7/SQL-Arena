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

export const ICONS: Record<string, ReactNode> = {
  // onboarding / general
  spark: <Sparkles className={className} />,
  book: <BookOpen className={className} />,
  timer: <Timer className={className} />,

  // milestones
  target: <Target className={className} />,
  trophy: <Trophy className={className} />,
  flame: <Flame className={className} />,
  check: <Check className={className} />,

  // quality
  bolt: <Zap className={className} />,
  eye_off: <EyeOff className={className} />,
  lock: <Lock className={className} />,

  // concepts
  link: <Link2 className={className} />,
  wand: <Wand2 className={className} />,
  sigma: <Sigma className={className} />,
  search: <Search className={className} />,
  arrow_down_up: <ArrowDownUp className={className} />,
  funnel: <Funnel className={className} />,
  sparkles: <Sparkles className={className} />,
  calendar: <Calendar className={className} />,
  code: <Code className={className} />,
  check_circle: <CheckCircle2 className={className} />,
  gauge: <Gauge className={className} />,
};
