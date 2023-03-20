import { MongoRefreshTokenModel } from "../models/tokens/MongoRefreshTokenModel";
import { ObjectId } from "mongodb";
import {MongoDeviceModel} from "../models/devices/MongoDeviceModel";
import {devicesRepository} from "../repositories/mongodb-devices-repository";
import {jwtService} from "../application/jwt-service";

export const devicesService = {
  // Create new blacklisted refresh token
  async createNewDevice(
    refreshToken: string,
    ip: string
  ): Promise<MongoDeviceModel | null> {
    const deviceId = await jwtService.getDeviceIdByToken(refreshToken);

    if (!deviceId) {
      return null
    }

    const newDevice = {
      _id: new ObjectId(),
      ip,
      title: "sometitle",
      lastActiveDate: "somedate",
      deviceId: deviceId
    };

    return devicesRepository.createDevice(newDevice);
  },

  // // Delete all blacklisted refresh tokens
  // async deleteAll(): Promise<boolean> {
  //   return blacklistedTokensRepository.deleteAll();
  // },
};