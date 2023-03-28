import { StringId } from "../global/StringId";
import { MongoUserModel } from "./MongoUserModel";

export type MongoUserModelWithStringId = MongoUserModel & StringId;