import { MongoIdModel } from "../global/MongoIdModel";
import { MongoBlogModel } from "./MongoBlogModel";

export type MongoBlogModelWithId = MongoBlogModel & MongoIdModel;