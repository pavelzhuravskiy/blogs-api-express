import { MongoIdModel } from "../global/MongoIdModel";
import { MongoDeviceModel } from "./MongoDeviceModel";

export type MongoDeviceModelWithId = MongoDeviceModel & MongoIdModel;