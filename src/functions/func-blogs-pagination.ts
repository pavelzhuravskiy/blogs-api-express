import { blogsCollection } from "../repositories/mongodb/_mongodb-connect";
import { Document, Sort } from "mongodb";

export const funcBlogsPagination = async (
  filter: Document,
  sortingObj: Sort,
  pageNumber: number,
  pageSize: number
) => {
  return await blogsCollection
    .find(filter)
    .sort(sortingObj)
    .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0)
    .limit(+pageSize > 0 ? +pageSize : 0)
    .toArray();
};