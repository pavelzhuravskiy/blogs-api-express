import { MongoIdModel } from "../global/MongoIdModel";
import { MongoCommentModel } from "./MongoCommentModel";

export type MongoCommentModelWithId = MongoCommentModel & MongoIdModel;