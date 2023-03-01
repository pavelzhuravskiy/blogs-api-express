import { MongoIdModel } from "../global/MongoIdModel";
import { MongoPostModel } from "./MongoPostModel";

export type MongoPostModelWithId = MongoPostModel & MongoIdModel;