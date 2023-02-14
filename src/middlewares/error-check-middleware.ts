import { NextFunction, Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export const errorCheckMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFormatter = ({ msg, param }: ValidationError) => {
    return {
      message: msg,
      field: param,
    };
  };

  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    res.status(400).json({ errorsMessages: result.array() });
  } else {
    next();
  }
  return;
};