import { param } from "express-validator";
import { devicesService } from "../../../domain/devices-service";

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesService.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);