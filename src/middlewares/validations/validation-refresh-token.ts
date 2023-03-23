import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { devicesQueryRepository } from "../../repositories/query-repos/mongodb-devices-query-repository";

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

  const deviceId = cookieRefreshTokenObj.deviceId;

  // console.log(deviceId)

  const dbDevice = await devicesQueryRepository.findDeviceById(deviceId);

  console.log(dbDevice);

  // if (!dbDevice) {
  //   res.sendStatus(300);
  //   return;
  // }

  const dbLastActiveDate = dbDevice?.lastActiveDate;
  const cookieRefreshTokenIat = cookieRefreshTokenObj.iat;

  // console.log(dbLastActiveDate)
  // console.log(cookieRefreshTokenIat)

  if (dbLastActiveDate !== cookieRefreshTokenIat) {
    res.sendStatus(401);
    return;
  }

  next();
};