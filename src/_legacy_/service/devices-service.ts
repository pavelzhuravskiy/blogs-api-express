import { ObjectId } from "mongodb";
import { MongoDeviceModel } from "../../models/devices/MongoDeviceModel";
import { devicesRepository } from "../../repositories/mongodb-devices-repository";
import { jwtService } from "../../application/jwt-service";
import {blogsRepository} from "../../repositories/mongodb-blogs-repository";

export const devicesService = {
  async createDevice(
    refreshToken: string,
    ip: string,
    userAgent: string
  ): Promise<MongoDeviceModel | null> {
    const deviceId = await jwtService.getDeviceIdFromToken(refreshToken);

    const expirationDate = await jwtService.getExpirationDateFromToken(
      refreshToken
    );
    const issuedAt = await jwtService.getIssuedAtFromToken(refreshToken);

    if (!deviceId || !expirationDate || !issuedAt) {
      return null;
    }

    const newDevice = {
      _id: new ObjectId(),
      ip,
      title: userAgent,
      deviceId: deviceId,
      lastActiveDate: issuedAt,
      expirationDate: expirationDate,
    };

    return devicesRepository.createDevice(newDevice);
  },

  async updateDevice(
    ip: string,
    deviceId: string,
    issuedAt: number
  ): Promise<boolean> {
    return devicesRepository.updateDevice(ip, deviceId, issuedAt);
  },

  async updateIp(ip: string, deviceId: string): Promise<boolean> {
    return devicesRepository.updateIp(ip, deviceId);
  },

  async deleteDevice(deviceId: string): Promise<boolean> {
    return devicesRepository.deleteDevice(deviceId);
  },

  async deleteAll(): Promise<boolean> {
    return devicesRepository.deleteAll();
  },

  // // Delete all blacklisted refresh tokens
  // async deleteAll(): Promise<boolean> {
  //   return blacklistedTokensRepository.deleteAll();
  // },
};