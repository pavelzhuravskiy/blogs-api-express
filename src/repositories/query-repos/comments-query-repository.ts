import { ObjectId } from "mongodb";
import { funcCommentsMapping } from "../../functions/mappings/func-comments-mapping";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { funcFilter } from "../../functions/global/func-filter";
import { Paginator } from "../../models/global/Paginator";
import { CommentViewModel } from "../../models/view/CommentViewModel";
import { Comments } from "../../schemas/commentSchema";

export const commentsQueryRepository = {
  // Return comments with query
  async findComments(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
    postId: ObjectId
  ): Promise<Paginator<CommentViewModel[]>> {
    // Filter
    const commentsFilter = await funcFilter(undefined, postId);

    // Pagination
    const commentsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      Comments,
      commentsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      commentsPagination,
      Comments,
      funcCommentsMapping,
      commentsFilter
    );
  },

  async findCommentById(_id: ObjectId): Promise<CommentViewModel | null> {
    const foundComment = await Comments.findOne({ _id });

    if (!foundComment) {
      return null;
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