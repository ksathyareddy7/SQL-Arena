import express from "express";
import { listBadges, badgesSummary } from "../controllers/badges.js";

const router = express.Router();

router.get("/", listBadges);
router.get("/summary", badgesSummary);

export default router;

