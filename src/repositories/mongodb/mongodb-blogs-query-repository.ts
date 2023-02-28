import { blogsCollection } from "./_mongodb-connect";
import { MongoBlogModelWithPagination } from "../../models/mongodb/MongoBlogModelWithPagination";
import { funcBlogMapping } from "../../functions/func-blog-mapping";
import { funcBlogsPagination } from "../../functions/func-blogs-pagination";
import { Document, ObjectId, Sort } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/mongodb/MongoBlogModelWithStringId";

export const blogsQueryRepository = {
  // Return blogs with filter
  async findBlogs(
    searchNameTerm: null | string = null,
    sortBy: string = "createdAt",
    sortDirection: string = "desc",
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<MongoBlogModelWithPagination> {
    const filter: Document = {};
    const sortingObj: Sort = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    if (sortBy) {
      sortingObj[sortBy] = -1;
    }

    if (sortDirection === "asc") {
      sortingObj[sortBy] = 1;
    }

    const output = await funcBlogsPagination(
      filter,
      sortingObj,
      pageNumber,
      pageSize
    );
    const outputCount = await blogsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(outputCount / +pageSize);

    return {
      pagesCount: pagesCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: outputCount,
      items: funcBlogMapping(output),
    };
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