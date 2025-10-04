import { Router } from "express";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.get("/:Id", getUserById);
usersRouter.put("/", updateUser);
usersRouter.delete("/", deleteUser);
