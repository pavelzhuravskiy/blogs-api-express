import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../application/jwt-service";
import { ObjectId } from "mongodb";
import { UsersService } from "../../domain/users-service";

const usersService = new UsersService();
const jwtService = new JwtService();

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
    req.user = await usersService.findUserById(userId);
    next();
  } else {
    res.sendStatus(401);
  }
};