import { Router } from "express";
import { health } from "../controllers/health.controller.js";
import { protectedRouter } from "./protected/index.js";
import { publicRouter } from "./public/index.js";

export const router = Router();

router.use("/health", health);
router.use("/auth", publicRouter);
router.use("/api", protectedRouter);
