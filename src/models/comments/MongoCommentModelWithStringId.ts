import { GlobalIdStringModel } from "../global/GlobalIdStringModel";
import { MongoCommentsModel } from "./MongoCommentsModel";

export type MongoCommentModelWithStringId = MongoCommentsModel &
  GlobalIdStringModel;