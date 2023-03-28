import { Blogs } from "../../schemas/blogSchema";
import { FilterQuery, SortOrder } from "mongoose";
import { BlogDBModel } from "../../models/blogs/BlogDBModel";

export const funcPagination = async (
  sortingObj: { [key: string]: SortOrder },
  pageNumber: number,
  pageSize: number,
  mongooseModel: any, // TODO Fix
  filter: FilterQuery<BlogDBModel> | {}
) => {
  return Blogs.find(filter)
    .lean()
    .sort(sortingObj)
    .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
    .limit(pageSize > 0 ? pageSize : 0);
};