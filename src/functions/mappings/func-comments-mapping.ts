import { MongoCommentModelWithId } from "../../models/comments/MongoCommentModelWithId";

export const funcCommentsMapping = (array: MongoCommentModelWithId[]) => {
  return array.map((comment) => {
    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: {
        userId: comment.commentatorInfo.userId,
        userLogin: comment.commentatorInfo.userLogin,
      },
      createdAt: comment.createdAt,
    };
  });
};