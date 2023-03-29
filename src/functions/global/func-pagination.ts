import { FilterQuery, SortOrder } from "mongoose";

export const funcPagination = async (
  sortingObj: { [key: string]: SortOrder },
  pageNumber: number,
  pageSize: number,
  mongooseModel: any, // TODO Fix
  filter: FilterQuery<any>
) => {
  return mongooseModel
    .find(filter)
    .lean()
    .sort(sortingObj)
    .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
    .limit(pageSize > 0 ? pageSize : 0);
};