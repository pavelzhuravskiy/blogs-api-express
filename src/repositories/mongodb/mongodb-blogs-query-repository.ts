import { blogsCollection } from "./_mongodb-connect";
import { MongoBlogModelWithPagination } from "../../models/mongodb/MongoBlogModelWithPagination";
import { funcBlogMapping } from "../../functions/func-blog-mapping";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/mongodb/MongoBlogModelWithStringId";
import { funcFindWithQuery } from "../../functions/func-find-with-query";

export const blogsQueryRepository = {
  // Return blogs with query
  async findBlogs(
    searchNameTerm: null | string,
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MongoBlogModelWithPagination> {
    return funcFindWithQuery(
      undefined,
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      blogsCollection,
      funcBlogMapping
    );
  },

  // Return blog by ID
  async findBlogById(
    _id: ObjectId
  ): Promise<false | MongoBlogModelWithStringId> {
    const foundBlog = await blogsCollection.findOne({ _id });

    if (!foundBlog) {
      return false;
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