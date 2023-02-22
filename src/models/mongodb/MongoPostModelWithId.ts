import {MongoIdModel} from "./MongoIdModel";
import {MongoPostModel} from "./MongoPostModel";

export type MongoPostModelWithId = MongoPostModel & MongoIdModel;