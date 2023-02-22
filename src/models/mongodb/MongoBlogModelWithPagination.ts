import {MongoBlogModelWithStringId} from "./MongoBlogModelWithStringId";

export type MongoBlogModelWithPagination = {
  pagesCount: number;
  pageSize: number;
  page: number;
  totalCount: number;
  items: MongoBlogModelWithStringId[];
};