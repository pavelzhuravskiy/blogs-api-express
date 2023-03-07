import { commentsCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcFindManyWithQuery } from "../functions/global/func-find-many-with-query";
import { MongoPostModelWithPagination } from "../models/posts/MongoPostModelWithPagination";
import { funcCommentsMapping } from "../functions/mappings/func-comments-mapping";
import { MongoCommentModelWithStringId } from "../models/comments/MongoCommentModelWithStringId";

export const commentsQueryRepository = {
  // Return comments with query
  async findComments(
    blogId: ObjectId | null,
    searchNameTerm: null | string,
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MongoPostModelWithPagination> {
    return funcFindManyWithQuery(
      undefined,
      undefined,
      undefined,
      undefined,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      commentsCollection,
      funcCommentsMapping
    );
  },
  // Return comment by ID
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