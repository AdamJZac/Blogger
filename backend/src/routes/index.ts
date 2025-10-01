import { Router } from "express";
import { publicRoutes } from "./public";

export const router = Router();

router.use("/auth", publicRoutes);
router.use("/health", publicRoutes);
