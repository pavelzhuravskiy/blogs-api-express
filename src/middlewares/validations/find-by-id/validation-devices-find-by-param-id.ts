import { param } from "express-validator";
import { devicesQueryRepository } from "../../../repositories/query-repos/mongodb-devices-query-repository";

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesQueryRepository.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);