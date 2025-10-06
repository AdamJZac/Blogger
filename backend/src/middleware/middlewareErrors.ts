import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/index.js";

export function middlewareErrors(
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
