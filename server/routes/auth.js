import express from "express";
import { login, signup, listUsers } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/users", listUsers);

export default router;
