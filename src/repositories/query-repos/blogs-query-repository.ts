import { ObjectId } from "mongodb";
import { BlogViewModel } from "../../models/view/BlogViewModel";
import { Paginator } from "../../models/global/Paginator";
import { Blogs } from "../../schemas/blogSchema";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { funcFilter } from "../../functions/global/func-filter";
import { funcBlogsMapping } from "../../functions/mappings/func-blogs-mapping";

export const blogsQueryRepository = {
  // Return blogs with query
  async findBlogs(
    searchNameTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string
  ): Promise<Paginator<BlogViewModel[]>> {
    // Filter
    const blogsFilter = await funcFilter(undefined, undefined, searchNameTerm);

    // Pagination
    const blogsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      Blogs,
      blogsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      blogsPagination,
      Blogs,
      funcBlogsMapping,
      blogsFilter
    );
  },

  // Return blog by ID
  async findBlogById(_id: ObjectId): Promise<BlogViewModel | null> {
    const foundBlog = await Blogs.findOne({ _id });

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