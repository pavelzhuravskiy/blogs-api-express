import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { container } from "../../composition-root";
import { JwtService } from "../../application/jwt-service";
import { UsersService } from "../../domain/users-service";

const jwtService = container.resolve(JwtService);
const usersService = container.resolve(UsersService);

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