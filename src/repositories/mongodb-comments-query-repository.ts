import { commentsCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcCommentsMapping } from "../functions/mappings/func-comments-mapping";
import { MongoCommentModelWithStringId } from "../models/comments/MongoCommentModelWithStringId";
import { funcFilter } from "../functions/global/func-filter";
import { funcPagination } from "../functions/global/func-pagination";
import { funcSorting } from "../functions/global/func-sorting";
import { funcOutput } from "../functions/global/func-output";
import { MongoCommentsModelWithPagination } from "../models/comments/MongoCommentsModelWithPagination";

export const commentsQueryRepository = {
  // Return comments with query
  async findComments(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
    blogId?: ObjectId
  ): Promise<MongoCommentsModelWithPagination> {
    // Filter
    const commentsFilter = await funcFilter(blogId);

    // Pagination
    const commentsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      commentsCollection,
      commentsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      commentsPagination,
      commentsCollection,
      funcCommentsMapping,
      commentsFilter
    );
  },

  async findCommentById(
    _id: ObjectId
  ): Promise<boolean | MongoCommentModelWithStringId> {
    const foundComment = await commentsCollection.findOne({ _id });

    if (!foundComment) {
      return false;
    }

    return {
      id: foundComment._id.toString(),
      content: foundComment.content,
      commentatorInfo: {
        userId: foundComment.commentatorInfo.userId,
        userLogin: foundComment.commentatorInfo.userLogin,
      },
      createdAt: foundComment.createdAt,
    };
  },
};