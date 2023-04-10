import { NextFunction, Request, Response } from "express";
import { container } from "../../composition-root";
import { JwtService } from "../../application/jwt-service";
import { DevicesService } from "../../domain/devices-service";

const jwtService = container.resolve(JwtService);
const devicesService = container.resolve(DevicesService);

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
  const device = await devicesService.findDeviceById(deviceId);

  const deviceUserId = device?.userId;
  const cookieUserId = cookieRefreshTokenObj.userId.toString();

  if (deviceUserId !== cookieUserId) {
    res.sendStatus(403);
    return;
  }

  next();
};