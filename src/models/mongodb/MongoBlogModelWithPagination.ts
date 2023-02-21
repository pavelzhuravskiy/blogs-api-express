import { MongoBlogModelWithId } from "./MongoBlogModelWithId";

export type MongoBlogModelWithPagination = {
  pagesCount: number;
  pageSize: number;
  page: number;
  totalCount: number;
  items: MongoBlogModelWithId[];
};