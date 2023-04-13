import { DeviceViewModel } from "../../models/view/DeviceViewModel";
import { Devices } from "../../schemas/deviceSchema";
import { injectable } from "inversify";
import { DeviceDBModel } from "../../models/database/DeviceDBModel";

@injectable()
export class DevicesQueryRepository {
  async findDevices(userId: string): Promise<DeviceViewModel[]> {
    const devices = await Devices.find({ userId }).lean();
    return this.devicesMapping(devices);
  }
  private async devicesMapping(array: DeviceDBModel[]) {
    return array.map((device) => {
      return {
        ip: device.ip,
        title: device.title,
        lastActiveDate: new Date(device.lastActiveDate * 1000).toISOString(),
        deviceId: device.deviceId,
      };
    });
  }
}