import { ObjectId } from "mongodb";
import { MongoDeviceModel } from "../models/devices/MongoDeviceModel";
import { devicesRepository } from "../repositories/mongodb-devices-repository";
import { jwtService } from "../application/jwt-service";

export const devicesService = {
  // Create new blacklisted refresh token
  async createNewDevice(
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

  // // Delete all blacklisted refresh tokens
  // async deleteAll(): Promise<boolean> {
  //   return blacklistedTokensRepository.deleteAll();
  // },
};