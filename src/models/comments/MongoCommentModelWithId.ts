import { MongoId } from "../global/MongoId";
import { MongoCommentModel } from "./MongoCommentModel";

export type MongoCommentModelWithId = MongoCommentModel & MongoId;