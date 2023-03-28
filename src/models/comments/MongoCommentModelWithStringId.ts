import { StringId } from "../global/StringId";
import { MongoCommentModel } from "./MongoCommentModel";

export type MongoCommentModelWithStringId = MongoCommentModel &
  StringId;