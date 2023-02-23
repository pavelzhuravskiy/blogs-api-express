import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoPostModel } from "./MongoPostModel";

export type MongoPostModelWithStringId = MongoPostModel & GlobalIdStringModel;