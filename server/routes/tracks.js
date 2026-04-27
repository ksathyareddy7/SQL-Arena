import express from "express";
import {
  getTrack,
  getTrackLesson,
  listTrackLessons,
  listTracks,
} from "../controllers/tracks.js";

const router = express.Router();

router.get("/", listTracks);
router.get("/:slug", getTrack);
router.get("/:slug/lessons", listTrackLessons);
router.get("/:slug/lessons/:lessonSlug", getTrackLesson);

export default router;

