import { DeviceDBModel } from "../../models/database/DeviceDBModel";

export const funcDevicesMapping = (array: DeviceDBModel[]) => {
  return array.map((device) => {
    return {
      ip: device.ip,
      title: device.title,
      lastActiveDate: new Date(device.lastActiveDate * 1000).toISOString(),
      deviceId: device.deviceId,
    };
  });
};