import { NextFunction, Request, Response, Router } from "express";

export const authRouter = Router();

export const login = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Login attempt" });
};
