import { Router } from "express";
import { login } from "./auth";
import { health } from "./health";

export const publicRoutes = Router();

publicRoutes.get("/", health);
publicRoutes.post("/login", login);
