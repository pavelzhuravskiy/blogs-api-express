import { blogsCollection } from "../global/_mongodb-connect";
import { MongoBlogModelWithPagination } from "../../models/blogs/MongoBlogModelWithPagination";
import { funcBlogMapping } from "../../functions/blogs/func-blog-mapping";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/blogs/MongoBlogModelWithStringId";
import { funcFindWithQuery } from "../../functions/global/func-find-with-query";

export const usersQueryRepository = {
  // Return users with query
  async findUsers(
    searchLoginTerm: null | string,
    searchEmailTerm: null | string,
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MongoBlogModelWithPagination> {
    return funcFindWithQuery(
      undefined,
      undefined,
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      blogsCollection, // TODO Change
      funcBlogMapping // TODO Change
    );
  },
};