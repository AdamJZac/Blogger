import { Router } from "express";
import { blogsRouter } from "./blogs.js";
import { usersRouter } from "./users.js";

export const protectedRouter = Router();

protectedRouter.use("/users", usersRouter);
protectedRouter.use("/blogs", blogsRouter);
