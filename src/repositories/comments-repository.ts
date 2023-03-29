import { CommentViewModel } from "../models/view/CommentViewModel";
import { ObjectId } from "mongodb";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { Comments } from "../schemas/commentSchema";

export const commentsRepository = {
  // Create new comment
  async createNewComment(
    newComment: CommentDBModel
  ): Promise<CommentViewModel> {
    const insertedComment = await Comments.create(newComment);

    return {
      id: insertedComment._id.toString(),
      content: newComment.content,
      commentatorInfo: {
        userId: newComment.commentatorInfo.userId,
        userLogin: newComment.commentatorInfo.userLogin,
      },
      createdAt: newComment.createdAt,
    };
  },

  // Update existing comment
  async updateComment(_id: ObjectId, content: string): Promise<boolean> {
    const result = await Comments.updateOne(
      { _id },
      {
        $set: {
          content: content,
        },
      }
    );
    return result.matchedCount === 1;
  },

  // Delete existing comment
  async deleteComment(_id: ObjectId): Promise<boolean> {
    const result = await Comments.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all comments
  async deleteAll(): Promise<boolean> {
    await Comments.deleteMany({});
    return (await Comments.countDocuments()) === 0;
  },
};