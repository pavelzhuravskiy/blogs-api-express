import { MongoUserModelWithStringId } from "./MongoUserModelWithStringId";

export type MongoUserModelWithPagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: MongoUserModelWithStringId[];
};