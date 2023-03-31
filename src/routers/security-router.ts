import { Router } from "express";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationDevicesFindByParamId } from "../middlewares/validations/find-by-id/validation-devices-find-by-param-id";
import { validationDeviceOwner } from "../middlewares/validations/validation-device-owner";
import { devicesController } from "../controllers/DevicesController";

export const securityRouter = Router({});

securityRouter.get("/devices", devicesController.getDevices);

securityRouter.delete(
  "/devices/:deviceId",
  validationDevicesFindByParamId,
  validationErrorCheck,
  validationDeviceOwner,
  devicesController.deleteDevice
);

securityRouter.delete("/devices", devicesController.deleteDevices);