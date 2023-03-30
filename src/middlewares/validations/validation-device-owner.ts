import { NextFunction, Request, Response } from "express";
import { jwtService } from "../../application/jwt-service";
import { devicesRepository } from "../../repositories/devices-repository";

export const validationDeviceOwner = async (
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

  const deviceId = req.params.deviceId;
  const device = await devicesRepository.findDeviceById(deviceId);

  const deviceUserId = device?.userId;
  const cookieUserId = cookieRefreshTokenObj.userId.toString();

  if (deviceUserId !== cookieUserId) {
    res.sendStatus(403);
    return;
  }

  next();
};