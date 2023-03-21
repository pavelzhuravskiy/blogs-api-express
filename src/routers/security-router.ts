import { Request, Response, Router } from "express";
import { devicesService } from "../domain/devices-service";
import { devicesQueryRepository } from "../repositories/query-repos/mongodb-devices-query-repository";
import {
    validationErrorCheck
} from "../middlewares/validations/_validation-error-check";
import {
    validationDevicesFindByParamId
} from "../middlewares/validations/find-by-id/validation-devices-find-by-param-id";

export const securityRouter = Router({});

securityRouter.get("/devices", async (req: Request, res: Response) => {
  const foundDevices = await devicesQueryRepository.findDevices();
  res.json(foundDevices);
});

securityRouter.delete(
  "/devices/:deviceId",
  validationDevicesFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isDeleted = await devicesService.deleteDevice(req.params.deviceId);
    if (isDeleted) {
      res.sendStatus(204);
    }
  }
);

securityRouter.delete("/devices", async (req: Request, res: Response) => {
  const isDeleted = await devicesService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});