import { param } from "express-validator";
import { DevicesService } from "../../../domain/devices-service";

const devicesService = new DevicesService();

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesService.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);