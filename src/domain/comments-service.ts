import { ObjectId } from "mongodb";
import { MongoCommentModel } from "../models/comments/MongoCommentModel";
import { MongoCommentModelWithStringId } from "../models/comments/MongoCommentModelWithStringId";
import { postsQueryRepository } from "../repositories/query-repos/mongodb-posts-query-repository";
import { commentsRepository } from "../repositories/mongodb-comments-repository";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";

export const commentsService = {
  // Create new comment
  async createNewCommentByPostId(
    _id: ObjectId,
    content: MongoCommentModel,
    _userId: ObjectId
  ): Promise<boolean | MongoCommentModelWithStringId> {
    const post = await postsQueryRepository.findPostById(new ObjectId(_id));
    if (!post) {
      return false;
    }
    const user = await usersQueryRepository.findUserByIdWithMongoId(_userId);
    const newComment = {
      ...content,
      commentatorInfo: {
        userId: user!._id.toString(),
        userLogin: user!.login,
      },
      postId: _id.toString(),
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

  // Delete existing comment
  async deleteComment(_id: ObjectId): Promise<boolean> {
    return commentsRepository.deleteComment(_id);
  },

  // Delete all comments by post ID
  async deleteCommentsByPostId(_id: ObjectId): Promise<boolean> {
    return commentsRepository.deleteCommentsByPostId(_id);
  },

  // Delete all comments
  async deleteAll(): Promise<boolean> {
    return commentsRepository.deleteAll();
  },
};