import { NextFunction, Request, Response } from "express";

export const health = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "OK" });
};
