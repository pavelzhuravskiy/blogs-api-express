import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { ObjectId } from "mongodb";
import { usersRepository } from "../../repositories/users-repository";

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
  const tokenObj = await jwtService.verifyToken(token);

  if (tokenObj) {
    const userId = new ObjectId(tokenObj.userId);
    req.user = await usersRepository.findUserById(userId);
    next();
  } else {
    res.sendStatus(401);
  }
};