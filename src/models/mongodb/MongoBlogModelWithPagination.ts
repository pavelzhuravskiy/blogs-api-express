import {MongoBlogModelWithStringId} from "./MongoBlogModelWithStringId";

export type MongoBlogModelWithPagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: MongoBlogModelWithStringId[];
};