import { Router } from "express";
import { authRouter } from "./auth.js";

export const publicRouter = Router();

publicRouter.post("/", authRouter);
