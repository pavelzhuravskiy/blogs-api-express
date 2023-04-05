import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../application/jwt-service";
import { ObjectId } from "mongodb";
import { UsersService } from "../../domain/users-service";
import { UsersRepository } from "../../repositories/users-repository";

const usersRepository = new UsersRepository();

const usersService = new UsersService(usersRepository);
const jwtService = new JwtService();

export const tokenParser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next();
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  const tokenObj = await jwtService.verifyToken(token);

  if (tokenObj) {
    const userId = new ObjectId(tokenObj.userId);
    req.user = await usersService.findUserById(userId);
    next();
  } else {
    next();
  }
};