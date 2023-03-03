import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoUserModel } from "./MongoUserModel";

export type MongoUserModelWithStringId = MongoUserModel & GlobalIdStringModel;