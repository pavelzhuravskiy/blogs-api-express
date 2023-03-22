import { Request, Response, Router } from "express";
import { devicesService } from "../domain/devices-service";
import { devicesQueryRepository } from "../repositories/query-repos/mongodb-devices-query-repository";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationDevicesFindByParamId } from "../middlewares/validations/find-by-id/validation-devices-find-by-param-id";
import { validationRefreshToken } from "../middlewares/validations/validation-refresh-token";
import { jwtService } from "../application/jwt-service";
import { validationDeviceOwner } from "../middlewares/validations/validation-device-owner";

export const securityRouter = Router({});

securityRouter.get("/devices", async (req: Request, res: Response) => {
  const cookieRefreshToken = req.cookies.refreshToken;
  const cookieRefreshTokenObj = await jwtService.verifyToken(
    cookieRefreshToken
  );

  if (cookieRefreshTokenObj) {
    const userId = cookieRefreshTokenObj!.userId.toString();
    const foundDevices = await devicesQueryRepository.findDevices(userId);
    res.json(foundDevices);
  } else {
    res.sendStatus(401);
  }
});

securityRouter.delete(
  "/devices/:deviceId",
  validationDevicesFindByParamId,
  validationErrorCheck,
  validationDeviceOwner,
  async (req: Request, res: Response) => {
    const isDeleted = await devicesService.deleteDevice(req.params.deviceId);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

securityRouter.delete(
  "/devices",
  validationRefreshToken,
  async (req: Request, res: Response) => {
    const isDeleted = await devicesService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);