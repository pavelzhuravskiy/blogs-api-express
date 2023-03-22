import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";

export const validationRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookieRefreshToken = req.cookies.refreshToken;

  if (!cookieRefreshToken) {
    res.sendStatus(401);
    return;
  }

  const cookieRefreshTokenObj = await jwtService.verifyToken(
    cookieRefreshToken
  );

  if (!cookieRefreshTokenObj) {
    res.sendStatus(401);
    return;
  }

  next();
};