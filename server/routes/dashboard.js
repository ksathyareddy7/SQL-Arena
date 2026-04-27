import express from "express";
import { getDashboardStats, getSolvedExercises, resetUserProgress } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/stats", getDashboardStats);
router.get("/solved", getSolvedExercises);
router.post("/reset-progress", resetUserProgress);

export default router;
