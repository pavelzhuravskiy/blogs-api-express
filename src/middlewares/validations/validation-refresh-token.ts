import { NextFunction, Request, Response } from "express";
import { tokensQueryRepository } from "../../repositories/query-repos/mongodb-tokens-query-repository";

export const validationRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;

  console.log(refreshToken)

  if (!refreshToken) {
    res.sendStatus(401);
    return;
  }

  const findTokenInBlackList = await tokensQueryRepository.findBlackListedToken(
    refreshToken
  );
  if (!findTokenInBlackList) {
    next();
  } else {
    res.sendStatus(401);
  }
};