import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoUserModel } from "./MongoUserModel";
import { MongoUserModelWithPassword } from "./MongoUserModelWithPassword";

export type MongoUserModelWithPasswordAndStringId = MongoUserModelWithPassword &
  GlobalIdStringModel;