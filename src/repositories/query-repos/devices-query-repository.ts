import { DeviceViewModel } from "../../models/view/DeviceViewModel";
import { funcDevicesMapping } from "../../functions/mappings/func-devices-mapping";
import { Devices } from "../../schemas/deviceSchema";
import { DeviceDBModel } from "../../models/database/DeviceDBModel";

export const devicesQueryRepository = {
  async findDevices(userId: string): Promise<DeviceViewModel[]> {
    const foundDevices = await Devices.find({ userId });
    return funcDevicesMapping(foundDevices);
  },

  async findDeviceById(deviceId: string): Promise<DeviceDBModel | null> {
    const foundDevice = await Devices.findOne({ deviceId });

    if (!foundDevice) {
      return null;
    }

    return foundDevice;
  },
};