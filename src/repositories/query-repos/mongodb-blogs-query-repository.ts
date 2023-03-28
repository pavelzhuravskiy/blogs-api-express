import { blogsCollection } from "../_mongodb-connect";
import { MongoBlogModelWithPagination } from "../../models/blogs/MongoBlogModelWithPagination";
import { blogsMapping } from "../../functions/mappings/blogs-mapping";
import { ObjectId } from "mongodb";
import { funcFilter } from "../../functions/global/func-filter";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcOutput } from "../../functions/global/func-output";
import { BlogViewModel } from "../../models/blogs/BlogViewModel";

export const blogsQueryRepository = {
  // Return blogs with query
  async findBlogs(
    searchNameTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string
  ): Promise<MongoBlogModelWithPagination> {
    // Filter
    const blogsFilter = await funcFilter(undefined, undefined, searchNameTerm);

    // Pagination
    const blogsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      blogsCollection,
      blogsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      blogsPagination,
      blogsCollection,
      blogsMapping,
      blogsFilter
    );
  },

  // Return blog by ID
  async findBlogById(_id: ObjectId): Promise<BlogViewModel | null> {
    const foundBlog = await blogsCollection.findOne({ _id });

    if (!foundBlog) {
      return null;
    }

    return {
      id: foundBlog._id.toString(),
      name: foundBlog.name,
      description: foundBlog.description,
      websiteUrl: foundBlog.websiteUrl,
      createdAt: foundBlog.createdAt,
      isMembership: foundBlog.isMembership,
    };
  },
};