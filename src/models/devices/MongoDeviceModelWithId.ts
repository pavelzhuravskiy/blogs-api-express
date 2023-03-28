import { MongoId } from "../global/MongoId";
import { MongoDeviceModel } from "./MongoDeviceModel";

export type MongoDeviceModelWithId = MongoDeviceModel & MongoId;