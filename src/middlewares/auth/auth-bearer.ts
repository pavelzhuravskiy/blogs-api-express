import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const authBearer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const userId = await jwtService.getUserIdFromToken(token);

  if (userId) {
    req.user = await usersQueryRepository.findUserByIdWithMongoId(userId);
    next();
  } else {
    res.sendStatus(401);
  }
};