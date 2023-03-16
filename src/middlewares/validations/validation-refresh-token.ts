import { NextFunction, Request, Response } from "express";
import { tokensQueryRepository } from "../../repositories/query-repos/mongodb-tokens-query-repository";

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

  const findRefreshTokenInBlackList =
    await tokensQueryRepository.findBlackListedToken(refreshToken);
  if (!findRefreshTokenInBlackList) {
    next();
  } else {
    res.sendStatus(401);
  }
};