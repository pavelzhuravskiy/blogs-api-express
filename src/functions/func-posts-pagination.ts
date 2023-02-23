import { postsCollection } from "../repositories/mongodb/_mongodb-connect";

export const funcPostsPagination = async (
  sortingObj: any,
  pageNumber: number,
  pageSize: number,
  filter?: any
) => {
  return await postsCollection
    .find(filter)
    .sort(sortingObj)
    .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0)
    .limit(+pageSize > 0 ? +pageSize : 0)
    .toArray();
};