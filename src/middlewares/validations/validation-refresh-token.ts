import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { devicesQueryRepository } from "../../repositories/query-repos/mongodb-devices-query-repository";

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

  const tokenIssuedAt = await jwtService.getIssuedAtFromToken(refreshToken);

  const deviceId = await jwtService.getDeviceIdFromToken(refreshToken);
  const device = await devicesQueryRepository.findDeviceById(deviceId!);

  const dbTokenIssuedAt = device?.lastActiveDate;

  if (tokenIssuedAt !== dbTokenIssuedAt) {
    res.sendStatus(401);
  } else {
    next();
  }
};