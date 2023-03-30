import { Devices } from "../schemas/deviceSchema";
import { DeviceDBModel } from "../models/database/DeviceDBModel";
import { DeviceViewModel } from "../models/view/DeviceViewModel";

export const devicesRepository = {
  async findDeviceById(deviceId: string): Promise<DeviceDBModel | null> {
    const foundDevice = await Devices.findOne({ deviceId });

    if (!foundDevice) {
      return null;
    }

    return foundDevice;
  },

  async createDevice(device: DeviceDBModel): Promise<DeviceViewModel> {
    await Devices.create(device);
    return {
      ip: device.ip,
      title: device.title,
      lastActiveDate: device.lastActiveDate.toString(),
      deviceId: device.deviceId
    };
  },

  async updateDevice(
    ip: string,
    userId: string,
    issuedAt: number
  ): Promise<boolean> {
    const result = await Devices.updateOne(
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

  async deleteDevice(deviceId: string): Promise<boolean> {
    const result = await Devices.deleteOne({ deviceId });
    return result.deletedCount === 1;
  },

  async deleteAllOldDevices(currentDevice: string): Promise<boolean> {
    await Devices.deleteMany({ deviceId: { $ne: currentDevice } });
    return (await Devices.countDocuments()) === 1;
  },

  async deleteAll(): Promise<boolean> {
    await Devices.deleteMany({});
    return (await Devices.countDocuments()) === 0;
  },
};