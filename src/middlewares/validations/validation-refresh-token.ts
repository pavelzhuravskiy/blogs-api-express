import { NextFunction, Request, Response } from "express";
import {jwtService} from "../../application/jwt-service";
// import { tokensQueryRepository } from "../../repositories/query-repos/mongodb-tokens-query-repository";

export const validationRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const tokenDate = await jwtService.getExpirationDateFromToken(
    refreshToken
  );

  const expirationDate = await

    console.log(tokenDate)

  next()

  // if (refreshToken.cookies.) {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }
};