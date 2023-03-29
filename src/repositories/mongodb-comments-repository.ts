import { commentsCollection } from "./_db-connect";
import { MongoCommentModel } from "../models/comments/MongoCommentModel";
import { MongoCommentModelWithStringId } from "../models/comments/MongoCommentModelWithStringId";
import { ObjectId } from "mongodb";

export const commentsRepository = {
  // Create new comment
  async createNewComment(
    newComment: MongoCommentModel
  ): Promise<MongoCommentModelWithStringId> {
    const insertedComment = await commentsCollection.insertOne(newComment);

    return {
      id: insertedComment.insertedId.toString(),
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
    const result = await commentsCollection.updateOne(
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
    const result = await commentsCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all comments
  async deleteAll(): Promise<boolean> {
    await commentsCollection.deleteMany({});
    return (await commentsCollection.countDocuments()) === 0;
  },
};