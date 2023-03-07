import { ObjectId } from "mongodb";
import { MongoCommentModel } from "../models/comments/MongoCommentModel";
import { MongoCommentModelWithStringId } from "../models/comments/MongoCommentModelWithStringId";
import { postsQueryRepository } from "../repositories/mongodb-posts-query-repository";
import { commentsRepository } from "../repositories/mongodb-comments-repository";

export const commentsService = {
  // Create new comment
  async createNewCommentByPostId(
    _id: ObjectId,
    content: MongoCommentModel
  ): Promise<boolean | MongoCommentModelWithStringId> {
    const post = await postsQueryRepository.findPostById(new ObjectId(_id));
    if (!post) {
      return false;
    }
    const newComment = {
      ...content,
      commentatorInfo: {
        userId: "someId", // TODO Fix
        userLogin: "someLogin", // TODO Fix
      },
      createdAt: new Date().toISOString(),
    };
    return commentsRepository.createNewComment(newComment);
  },

  // Update existing comment
  async updateComment(
    _id: ObjectId,
    comment: MongoCommentModel
  ): Promise<boolean> {
    return commentsRepository.updateComment(_id, comment.content);
  },
};