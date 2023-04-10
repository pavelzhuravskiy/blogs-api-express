import { DeviceViewModel } from "../../models/view/DeviceViewModel";
import { funcDevicesMapping } from "../../functions/mappings/func-devices-mapping";
import { Devices } from "../../schemas/deviceSchema";
import {injectable} from "inversify";

@injectable()
export class DevicesQueryRepository {
  async findDevices(userId: string): Promise<DeviceViewModel[]> {
    const foundDevices = await Devices.find({ userId }).lean();
    return funcDevicesMapping(foundDevices);
  }
}