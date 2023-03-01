import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoBlogModel } from "../blogs/MongoBlogModel";
import {MongoUserModel} from "./MongoUserModel";

export type MongoUserModelWithStringId = MongoUserModel & GlobalIdStringModel;