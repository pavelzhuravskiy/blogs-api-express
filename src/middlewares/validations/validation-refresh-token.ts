import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { devicesService } from "../../domain/devices-service";

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
  const cookieRefreshTokenIat = cookieRefreshTokenObj.iat;

  const dbDevice = await devicesService.findDeviceById(deviceId);

  if (dbDevice) {
    const lastActiveDate = dbDevice.lastActiveDate;
    if (cookieRefreshTokenIat < lastActiveDate) {
      res.sendStatus(401);
      return;
    }
  } else {
    res.sendStatus(401);
    return;
  }

  next();
};