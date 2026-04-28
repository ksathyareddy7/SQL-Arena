import express from "express";
import cors from "cors";
import "./config/env.js";
import exercisesRouter from "./routes/exercises.js";
import queryRouter from "./routes/query.js";
import dashboardRouter from "./routes/dashboard.js";
import authRouter from "./routes/auth.js";
import lessonsRouter from "./routes/lessons.js";
import tracksRouter from "./routes/tracks.js";
import mockInterviewsRouter from "./routes/mockInterviews.js";
import badgesRouter from "./routes/badges.js";
import morgan from "morgan";
import pool from "./database/db.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  // Require a valid user for all non-auth API routes.
  app.use(async (req, res, next) => {
    try {
      if (!req.path.startsWith("/api")) return next();
      if (req.path.startsWith("/api/auth")) return next();
      if (req.path === "/api/health") return next();
      // Metadata endpoints are safe to serve without auth and are used to populate filters.
      if (req.path.startsWith("/api/exercises/meta/")) return next();

      const rawUserId = req.headers["x-user-id"];
      const userId = Number(rawUserId);

      if (!rawUserId) {
        return res.status(401).json({
          error: "Missing session. Please log in again.",
          code: "MISSING_USER",
        });
      }

      if (!Number.isInteger(userId) || userId <= 0) {
        return res.status(401).json({
          error: "Invalid session. Please log in again.",
          code: "INVALID_USER",
        });
      }

      const { rowCount } = await pool.query(
        "SELECT 1 FROM users WHERE id = $1 LIMIT 1",
        [userId],
      );

      if (!rowCount) {
        return res.status(401).json({
          error: "Session expired (user not found). Please log in again.",
          code: "USER_NOT_FOUND",
        });
      }

      req.userId = userId;
      next();
    } catch (err) {
      console.error("Auth middleware error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Routes
  app.use("/api/exercises", exercisesRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/lessons", lessonsRouter);
  app.use("/api/tracks", tracksRouter);
  app.use("/api/mock-interviews", mockInterviewsRouter);
  app.use("/api/badges", badgesRouter);
  app.use("/api", queryRouter);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SQL Arena API is running" });
  });

  return app;
}

