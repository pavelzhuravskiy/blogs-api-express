import { MongoIdModel } from "../global/MongoIdModel";
import { MongoBlogModel } from "./MongoBlogModel";
import {MongoUserModel} from "../users/MongoUserModel";

export type MongoUserModelWithId = MongoUserModel & MongoIdModel;