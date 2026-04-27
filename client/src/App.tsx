import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import PageShell from "@/components/layout/PageShell";
import ChallengesList from "@/pages/ChallengesList";
import ExerciseDetail from "@/pages/ExerciseDetail";
import LessonMarkdownDev from "@/pages/dev/LessonMarkdownDev";
import Dashboard from "@/pages/Dashboard";
import MockInterviews from "@/pages/MockInterviews";
import MockInterviewSession from "@/pages/MockInterviewSession";
import MockInterviewSummary from "@/pages/MockInterviewSummary";
import MockInterviewReviewQuestion from "@/pages/MockInterviewReviewQuestion";
import MockInterviewHistory from "@/pages/MockInterviewHistory";
import Login from "@/pages/Login";
import Badges from "@/pages/Badges";
import Tracks from "@/pages/Tracks";
import TrackDetail from "@/pages/TrackDetail";
import TrackLesson from "@/pages/TrackLesson";
import About from "@/pages/About";

function Protected({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <PageShell>{children}</PageShell>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            <Protected>
              <ChallengesList />
            </Protected>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/about"
          element={
            <Protected>
              <About />
            </Protected>
          }
        />

        <Route
          path="/dashboard/badges"
          element={
            <Protected>
              <Badges />
            </Protected>
          }
        />

        <Route
          path="/exercises/:id"
          element={
            <Protected>
              <ExerciseDetail />
            </Protected>
          }
        />

        <Route
          path="/dev/lesson-markdown"
          element={
            <Protected>
              <LessonMarkdownDev />
            </Protected>
          }
        />

        <Route
          path="/tracks"
          element={
            <Protected>
              <Tracks />
            </Protected>
          }
        />

        <Route
          path="/tracks/:trackSlug"
          element={
            <Protected>
              <TrackDetail />
            </Protected>
          }
        />

        <Route
          path="/tracks/:trackSlug/lessons/:lessonSlug"
          element={
            <Protected>
              <TrackLesson />
            </Protected>
          }
        />

        <Route
          path="/mock-interviews"
          element={
            <Protected>
              <MockInterviews />
            </Protected>
          }
        />
        <Route
          path="/mock-interviews/history"
          element={
            <Protected>
              <MockInterviewHistory />
            </Protected>
          }
        />
        <Route
          path="/mock-interviews/sessions/:sessionId"
          element={
            <Protected>
              <MockInterviewSession />
            </Protected>
          }
        />
        <Route
          path="/mock-interviews/sessions/:sessionId/summary"
          element={
            <Protected>
              <MockInterviewSummary />
            </Protected>
          }
        />
        <Route
          path="/mock-interviews/sessions/:sessionId/review/:index"
          element={
            <Protected>
              <MockInterviewReviewQuestion />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
