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

  const cookieRefreshToken = req.cookies.refreshToken;

  if (!cookieRefreshToken) {
    next();
    return;
  }

  const cookieRefreshTokenObj = await jwtService.verifyToken(
      cookieRefreshToken
  );

  if (!cookieRefreshTokenObj) {
    next();
    return;
  }

  const userId = new ObjectId(cookieRefreshTokenObj.userId);
  req.user = await usersService.findUserById(userId);

  next();

};