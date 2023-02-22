import {MongoPostModelWithStringId} from "./MongoPostModelWithStringId";

export type MongoPostModelWithPagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: MongoPostModelWithStringId[];
};