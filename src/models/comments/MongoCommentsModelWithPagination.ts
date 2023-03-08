import { MongoCommentModelWithStringId } from "./MongoCommentModelWithStringId";

export type MongoCommentsModelWithPagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: MongoCommentModelWithStringId[];
};