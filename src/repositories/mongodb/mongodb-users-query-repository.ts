import { blogsCollection } from "./_mongodb-connect";
import { MongoBlogModelWithPagination } from "../../models/mongodb/MongoBlogModelWithPagination";
import { funcBlogMapping } from "../../functions/func-blog-mapping";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/mongodb/MongoBlogModelWithStringId";
import { funcFindWithQuery } from "../../functions/func-find-with-query";

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