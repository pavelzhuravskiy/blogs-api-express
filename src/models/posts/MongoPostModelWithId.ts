import { MongoId } from "../global/MongoId";
import { MongoPostModel } from "./MongoPostModel";

export type MongoPostModelWithId = MongoPostModel & MongoId;