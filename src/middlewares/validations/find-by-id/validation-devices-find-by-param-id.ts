import { param } from "express-validator";
import { devicesService } from "../../../composition-root";

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesService.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);