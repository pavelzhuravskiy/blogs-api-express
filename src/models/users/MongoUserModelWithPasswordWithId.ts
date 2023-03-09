import { MongoIdModel } from "../global/MongoIdModel";
import { MongoUserModelWithPassword } from "./MongoUserModelWithPassword";

export type MongoUserModelWithPasswordWithId = MongoUserModelWithPassword &
  MongoIdModel;