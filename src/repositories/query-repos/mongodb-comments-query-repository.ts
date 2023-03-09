import { commentsCollection } from "../_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcCommentsMapping } from "../../functions/mappings/func-comments-mapping";
import { MongoCommentModelWithStringId } from "../../models/comments/MongoCommentModelWithStringId";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { MongoCommentsModelWithPagination } from "../../models/comments/MongoCommentsModelWithPagination";

export const commentsQueryRepository = {
  // Return comments with query
  async findComments(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string
  ): Promise<MongoCommentsModelWithPagination> {
    // Pagination
    const commentsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      commentsCollection
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      commentsPagination,
      commentsCollection,
      funcCommentsMapping
    );
  },

  async findCommentById(
    _id: ObjectId
  ): Promise<false | MongoCommentModelWithStringId> {
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