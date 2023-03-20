import { MongoIdModel } from "../global/MongoIdModel";
import { MongoBlogModel } from "../blogs/MongoBlogModel";
import {MongoDeviceModel} from "./MongoDeviceModel";

export type MongoDeviceModelWithId = MongoDeviceModel & MongoIdModel;