import { devicesCollection } from "./_mongodb-connect";
import { MongoDeviceModel } from "../models/devices/MongoDeviceModel";

export const devicesRepository = {
  async createDevice(device: MongoDeviceModel): Promise<MongoDeviceModel> {
    await devicesCollection.insertOne(device);
    return device;
  },
};