import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/index.js";
import { isUser } from "../models/users.model.js";
import { UsersService } from "../services/users.service.js";

const defaultUsersService = new UsersService();

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
  usersService: UsersService = defaultUsersService
) => {
  try {
    const id = req.params["id"];
    if (!id) {
      throw new BadRequestError(new Error(`Invalid id submitted`));
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
  next: NextFunction,
  usersService: UsersService = defaultUsersService
) => {
  try {
    const userUpdates = req.body;
    if (!isUser(userUpdates)) {
      throw new BadRequestError(
        new Error("Request body does not match user shape")
      );
    }
    const updatedUser = await usersService.update(userUpdates);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
  usersService: UsersService = defaultUsersService
) => {
  try {
    const userToDelete = req.body;
    if (!isUser(userToDelete)) {
      throw new BadRequestError(
        new Error("Request body does not match user shape")
      );
    }
    const deletedUser = await usersService.delete(userToDelete);
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
};
