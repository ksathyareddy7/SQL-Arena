import express from "express";
import {
  getLesson,
  listLessons,
  upsertLessonProgress,
} from "../controllers/lessons.js";

const router = express.Router();

router.get("/", listLessons);
router.get("/:slug", getLesson);
router.post("/:slug/progress", upsertLessonProgress);

export default router;

