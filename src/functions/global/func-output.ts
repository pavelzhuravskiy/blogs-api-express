import { Blogs } from "../../schemas/blogSchema";
import { FilterQuery } from "mongoose";
import { BlogDBModel } from "../../models/blogs/BlogDBModel";

export const funcOutput = async (
  pageNumber: number,
  pageSize: number,
  output: any, // TODO Fix
  mongooseModel: any, // TODO Fix
  mapping: Function,
  filter: FilterQuery<BlogDBModel>
) => {
  const totalCount = await Blogs.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);

  return {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize: pageSize,
    totalCount,
    items: mapping(output),
  };
};