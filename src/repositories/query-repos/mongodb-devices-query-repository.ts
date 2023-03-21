import { devicesCollection } from "../_mongodb-connect";
import { MongoDeviceViewModel } from "../../models/devices/MongoDeviceViewModel";
import { funcDevicesMapping } from "../../functions/mappings/func-devices-mapping";
import { MongoDeviceModel } from "../../models/devices/MongoDeviceModel";

export const devicesQueryRepository = {
  async findDevices(): Promise<MongoDeviceViewModel[]> {
    const foundDevices = await devicesCollection.find({}).toArray();
    return funcDevicesMapping(foundDevices);
  },

  async findDeviceById(deviceId: string): Promise<MongoDeviceModel | null> {
    const foundDevice = await devicesCollection.findOne({ deviceId });

    if (!foundDevice) {
      return null;
    }

    return foundDevice;
  },
};