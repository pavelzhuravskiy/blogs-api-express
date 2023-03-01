import { MongoIdModel } from "../global/MongoIdModel";
import {MongoUserModel} from "../users/MongoUserModel";

export type MongoUserModelWithId = MongoUserModel & MongoIdModel;