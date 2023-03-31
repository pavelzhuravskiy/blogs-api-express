import { ObjectId } from "mongodb";
import { CommentViewModel } from "../models/view/CommentViewModel";
import { postsQueryRepository } from "../repositories/query-repos/posts-query-repository";
import { commentsRepository } from "../repositories/comments-repository";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { usersService } from "./users-service";

export const commentsService = {
  // Create new comment
  async createNewCommentByPostId(
    postId: ObjectId,
    content: CommentDBModel,
    userId: ObjectId
  ): Promise<boolean | CommentViewModel> {
    const post = await postsQueryRepository.findPostById(new ObjectId(postId));
    if (!post) {
      return false;
    }
    const user = await usersService.findUserById(userId);
    const newComment = {
      ...content,
      commentatorInfo: {
        userId: user!._id.toString(),
        userLogin: user!.accountData.login,
      },
      postId: postId.toString(),
      createdAt: new Date().toISOString(),
    };
    return commentsRepository.createNewComment(newComment);
  },

  // Update existing comment
  async updateComment(
    _id: ObjectId,
    comment: CommentViewModel
  ): Promise<boolean> {
    return commentsRepository.updateComment(_id, comment.content);
  },

  // Delete existing comment
  async deleteComment(_id: ObjectId): Promise<boolean> {
    return commentsRepository.deleteComment(_id);
  },

  // Delete all comments
  async deleteAll(): Promise<boolean> {
    return commentsRepository.deleteAll();
  },
};