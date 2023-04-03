import { CommentDBModel } from "../../models/database/CommentDBModel";

export const funcCommentsMapping = (array: CommentDBModel[]) => {
  return array.map((comment) => {
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
        myStatus: comment.likesInfo.myStatus
      }
    };
  });
};