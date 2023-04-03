import { param } from "express-validator";
import { DevicesService } from "../../../domain/devices-service";
import { JwtService } from "../../../application/jwt-service";
import { DevicesRepository } from "../../../repositories/devices-repository";

const devicesRepository = new DevicesRepository();
const jwtService = new JwtService();
const devicesService = new DevicesService(jwtService, devicesRepository);

export const validationDevicesFindByParamId = param("deviceId").custom(
  async (value) => {
    const result = await devicesService.findDeviceById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);