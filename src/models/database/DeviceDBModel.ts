import { WithId } from "mongodb";

export type DeviceDBModel = WithId<{
  ip: string;
  title: string;
  userId: string;
  deviceId: string;
  lastActiveDate: number;
  expirationDate: number;
}>;