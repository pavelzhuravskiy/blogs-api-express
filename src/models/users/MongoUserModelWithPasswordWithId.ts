import { MongoId } from "../global/MongoId";
import { MongoUserModelWithPassword } from "./MongoUserModelWithPassword";

export type MongoUserModelWithPasswordWithId = MongoUserModelWithPassword &
  MongoId;