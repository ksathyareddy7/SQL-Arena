import express from "express";
import {
  listTemplates,
  getActiveSession,
  listSessions,
  startSession,
  getSession,
  navigateSession,
  getSessionQuestion,
  revealSessionHint,
  executeSessionQuery,
  submitSessionAnswer,
  endSession,
  getSummary,
  getReviewSolutions,
} from "../controllers/mockInterviews.js";

const router = express.Router();

// These endpoints are interactive and must not be browser-cached. Caching can
// produce 304s that confuse the client (and can trigger retry loops).
router.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.set("Surrogate-Control", "no-store");
  next();
});

router.get("/templates", listTemplates);
router.get("/sessions/active", getActiveSession);
router.get("/sessions", listSessions);
router.post("/sessions", startSession);
router.get("/sessions/:sessionId", getSession);
router.post("/sessions/:sessionId/navigate", navigateSession);
router.get("/sessions/:sessionId/questions/:index", getSessionQuestion);
router.post("/sessions/:sessionId/questions/:index/hints/:hintId/reveal", revealSessionHint);
router.post("/sessions/:sessionId/questions/:index/execute", executeSessionQuery);
router.post("/sessions/:sessionId/questions/:index/submit", submitSessionAnswer);
router.post("/sessions/:sessionId/end", endSession);
router.get("/sessions/:sessionId/summary", getSummary);
router.get("/sessions/:sessionId/questions/:index/solutions", getReviewSolutions);

export default router;
