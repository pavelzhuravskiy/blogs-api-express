import { Document, Sort } from "mongodb";

export const funcPagination = async (
  sortingObj: Sort,
  pageNumber: number,
  pageSize: number,
  collection: Document,
  filter?: Document
) => {
  return await collection
    .find(filter)
    .sort(sortingObj)
    .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
    .limit(pageSize > 0 ? pageSize : 0)
    .toArray();
};