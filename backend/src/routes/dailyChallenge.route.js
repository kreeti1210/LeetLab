import express from "express";
import { getDailyChallenge } from "../controllers/dailyChallenge.controller.js";

const router = express.Router();

router.get("/challenge/daily", getDailyChallenge);

export default router;
