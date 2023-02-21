import { MongoIdModel } from "./MongoIdModel";
import { MongoBlogModel } from "./MongoBlogModel";

export type MongoBlogModelWithId = MongoBlogModel & MongoIdModel;