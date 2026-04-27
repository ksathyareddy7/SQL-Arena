import type { Step } from "react-joyride";

export type TourId = "challenges" | "exercise" | "lesson" | "mock_interviews";

export const TOURS: Record<
  TourId,
  { id: TourId; title: string; steps: Step[] }
> = {
  challenges: {
    id: "challenges",
    title: "Exercises",
    steps: [
      {
        target: '[data-tour="challenges.search"]',
        title: "Search",
        content: "Search exercises by name, code, or ID.",
        placement: "bottom",
        skipScroll: true,
      },
      {
        target: '[data-tour="challenges.filters.status"]',
        title: "Status",
        content: "Filter by your progress: solved, attempted, or not started.",
        placement: "bottom",
        skipScroll: true,
      },
      {
        target: '[data-tour="challenges.filters.difficulty"]',
        title: "Difficulty",
        content: "Focus on the difficulty you want to practice right now.",
        placement: "bottom",
        skipScroll: true,
      },
      {
        target: '[data-tour="challenges.list"]',
        title: "Exercise list",
        content: "Open any exercise to start solving.",
        placement: "top",
        skipScroll: true,
      },
      {
        target: '[data-tour="challenges.pagination"]',
        title: "Pagination",
        content: "Move through the full question bank page by page.",
        placement: "top",
      },
    ],
  },
  exercise: {
    id: "exercise",
    title: "Exercise",
    steps: [
      {
        target: '[data-tour="exercise.subtabs"]',
        title: "Tabs",
        content: "Switch between the question, schema, hints, and solutions.",
        placement: "bottom",
        skipScroll: true,
      },
      {
        target: '[data-tour="exercise.editor"]',
        title: "SQL Editor",
        content: "Write your query here. Your timer starts when you engage.",
        placement: "left",
      },
      {
        target: '[data-tour="exercise.run"]',
        title: "Run Query",
        content: "Execute your SQL and inspect the results.",
        placement: "top",
      },
      {
        target: '[data-tour="exercise.submit"]',
        title: "Submit",
        content: "Submit when your output matches the expected result shape.",
        placement: "top",
      },
      {
        target: '[data-tour="exercise.output"]',
        title: "Output",
        content:
          "Results, Explain plan, and Analyze executed query appear here.",
        placement: "top",
      },
    ],
  },
  lesson: {
    id: "lesson",
    title: "Lesson",
    steps: [
      {
        target: '[data-tour="lesson.sidebar"]',
        title: "Lesson navigation",
        content: "Browse lessons and jump between topics.",
        placement: "right",
        isFixed: true,
        skipScroll: true,
      },
      {
        target: '[data-tour="lesson.mark_in_progress"]',
        title: "Progress",
        content: "Mark your learning state so tracks can show progress.",
        placement: "bottom",
        skipScroll: true,
      },
      {
        target: '[data-tour="lesson.content"]',
        title: "Content",
        content: "Read the lesson and copy snippets as you go.",
        placement: "top",
      },
    ],
  },
  mock_interviews: {
    id: "mock_interviews",
    title: "Mock Interview",
    steps: [
      {
        target: '[data-tour="mock.templates"]',
        title: "Templates",
        content: "Pick a template to start a strict, timed interview session.",
        placement: "top",
      },
      {
        target: '[data-tour="mock.start"]',
        title: "Start",
        content: "Start a new inteview session.",
        placement: "top",
      },
      {
        target: '[data-tour="mock.history"]',
        title: "History",
        content: "View your past interview sessions.",
        placement: "top",
      },
      {
        target: '[data-tour="mock.resume"]',
        title: "Resume",
        content: "Resume an active inteview session.",
        placement: "top",
      },
    ],
  },
};

export function getTourIdForPath(pathname: string): TourId | null {
  if (pathname === "/" || pathname.startsWith("/?")) return "challenges";
  if (pathname.startsWith("/exercises/")) return "exercise";
  if (pathname.startsWith("/tracks/") && pathname.includes("/lessons/"))
    return "lesson";
  if (pathname.startsWith("/mock-interviews")) return "mock_interviews";
  return null;
}
