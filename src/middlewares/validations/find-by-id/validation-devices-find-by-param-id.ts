import { param } from "express-validator";
import { devicesRepository } from "../../../repositories/devices-repository";

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesRepository.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);