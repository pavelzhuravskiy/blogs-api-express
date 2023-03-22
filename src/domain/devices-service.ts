import { ObjectId } from "mongodb";
import { MongoDeviceModel } from "../models/devices/MongoDeviceModel";
import { devicesRepository } from "../repositories/mongodb-devices-repository";
import { jwtService } from "../application/jwt-service";

export const devicesService = {
  async createDevice(
    newRefreshToken: string,
    ip: string,
    userAgent: string
  ): Promise<MongoDeviceModel | null> {

    const newRefreshTokenObj = await jwtService.verifyToken(newRefreshToken);

    // console.log(newRefreshTokenObj)

    if (!newRefreshTokenObj) {
      return null;
    }

    const userId = newRefreshTokenObj.userId
    const deviceId = newRefreshTokenObj.deviceId;
    const expirationDate = newRefreshTokenObj.exp;
    const issuedAt = newRefreshTokenObj.iat;

    const newDevice = {
      _id: new ObjectId(),
      ip,
      title: userAgent,
      userId: userId.toString(),
      deviceId,
      lastActiveDate: issuedAt,
      expirationDate: expirationDate,
    };

    return devicesRepository.createDevice(newDevice);
  },

  async updateDevice(
    ip: string,
    deviceId: string,
    newDeviceId: string,
    issuedAt: number
  ): Promise<boolean> {
    return devicesRepository.updateDevice(ip, deviceId, newDeviceId, issuedAt);
  },

  async deleteDevice(deviceId: string): Promise<boolean> {
    return devicesRepository.deleteDevice(deviceId);
  },

  async deleteAll(): Promise<boolean> {
    return devicesRepository.deleteAll();
  },
};