import { BlogTypeView } from "./BlogViewModel";

export type MongoBlogModelWithPagination = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: BlogTypeView[];
};