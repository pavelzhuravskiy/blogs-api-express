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
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (accessToken) {
    const accessTokenObj = await jwtService.verifyToken(accessToken);
    const userId = new ObjectId(accessTokenObj?.userId);
    req.user = await usersService.findUserById(userId);
  }

  next();
};