import { CommentDBModel } from "../../models/database/CommentDBModel";
import { ObjectId } from "mongodb";
import { CommentsRepository } from "../../repositories/comments-repository";

const commentsRepository = new CommentsRepository();

export const funcCommentsMapping = (
  array: CommentDBModel[],
  userId?: ObjectId
) => {
  return Promise.all(
    array.map(async (comment) => {
      let status;

      if (userId) {
        status = await commentsRepository.findUserLikeStatus(
          comment._id,
          userId
        );
      }

      return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
          userId: comment.commentatorInfo.userId,
          userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt,
        likesInfo: {
          likesCount: comment.likesInfo.likesCount,
          dislikesCount: comment.likesInfo.dislikesCount,
          myStatus: status || "None",
        },
      };
    })
  );
};