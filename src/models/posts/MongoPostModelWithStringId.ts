import { StringId } from "../global/StringId";
import { MongoPostModel } from "./MongoPostModel";

export type MongoPostModelWithStringId = MongoPostModel & StringId;