import { Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { devicesQueryRepository } from "../repositories/query-repos/devices-query-repository";
import { devicesService } from "../domain/devices-service";

class DevicesController {
  async getDevices(req: Request, res: Response) {
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
  }

  async deleteDevice(req: Request, res: Response) {
    const isDeleted = await devicesService.deleteDevice(req.params.deviceId);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  async deleteDevices(req: Request, res: Response) {
    const cookieRefreshToken = req.cookies.refreshToken;
    const cookieRefreshTokenObj = await jwtService.verifyToken(
      cookieRefreshToken
    );
    if (cookieRefreshTokenObj) {
      const currentDevice = cookieRefreshTokenObj.deviceId;
      await devicesService.deleteAllOldDevices(currentDevice);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  }
}

export const devicesController = new DevicesController();