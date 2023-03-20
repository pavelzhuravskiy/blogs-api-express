import { MongoDeviceModelWithId } from "../../models/devices/MongoDeviceModelWithId";

export const funcDevicesMapping = (array: MongoDeviceModelWithId[]) => {
  return array.map((device) => {
    return {
      ip: device.ip,
      title: device.title,
      lastActiveDate: new Date(device.lastActiveDate * 1000).toISOString(),
      deviceId: device.deviceId,
    };
  });
};