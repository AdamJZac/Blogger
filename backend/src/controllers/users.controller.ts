import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/users.service.js";

const usersService = new UsersService();

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params["id"];
    if (!id) {
      throw new Error(`Invalid id submitted`);
    }
    const user = await usersService.findById(id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userUpdates = req.body;
    const updatedUser = await usersService.update(userUpdates);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToDelete = req.body;
    const deletedUser = await usersService.delete(userToDelete);
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
};
