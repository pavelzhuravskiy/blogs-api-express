import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoCommentModel } from "./MongoCommentModel";

export type MongoCommentModelWithStringId = MongoCommentModel &
  GlobalIdStringModel;