import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service.js";

const usersService = new UsersService();

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Login attempt" });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;
    const createdUser = await usersService.create(newUser);
    res.json(createdUser);
  } catch (err) {
    next(err);
  }
};
