import { devicesCollection } from "./_mongodb-connect";
import { MongoDeviceModel } from "../models/devices/MongoDeviceModel";

export const devicesRepository = {
  async createDevice(device: MongoDeviceModel): Promise<MongoDeviceModel> {
    await devicesCollection.insertOne(device);
    return device;
  },

  async updateDevice(
    ip: string,
    userId: string,
    issuedAt: number
  ): Promise<boolean> {
    const result = await devicesCollection.updateOne(
      { userId },
      {
        $set: {
          lastActiveDate: issuedAt,
          ip,
        },
      }
    );
    return result.matchedCount === 1;
  },

  async updateIp(ip: string, deviceId: string): Promise<boolean> {
    const result = await devicesCollection.updateOne(
      { deviceId },
      {
        $set: {
          ip: ip,
        },
      }
    );
    return result.matchedCount === 1;
  },

  async deleteDevice(deviceId: string): Promise<boolean> {
    const result = await devicesCollection.deleteOne({ deviceId });
    return result.deletedCount === 1;
  },

  async deleteAll(): Promise<boolean> {
    await devicesCollection.deleteMany({});
    return (await devicesCollection.countDocuments()) === 0;
  },
};