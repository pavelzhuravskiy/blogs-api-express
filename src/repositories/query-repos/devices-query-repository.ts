import { DeviceViewModel } from "../../models/view/DeviceViewModel";
import { funcDevicesMapping } from "../../functions/mappings/func-devices-mapping";
import { Devices } from "../../schemas/deviceSchema";

class DevicesQueryRepository {
  async findDevices(userId: string): Promise<DeviceViewModel[]> {
    const foundDevices = await Devices.find({ userId });
    return funcDevicesMapping(foundDevices);
  }
}

export const devicesQueryRepository = new DevicesQueryRepository();