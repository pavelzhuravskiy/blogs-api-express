import { ObjectId } from "mongodb";
import { CommentViewModel } from "../models/view/CommentViewModel";
import { postsQueryRepository } from "../repositories/query-repos/posts-query-repository";
import { commentsRepository } from "../repositories/comments-repository";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { usersService } from "./users-service";

class CommentsService {
  async createComment(
    postId: ObjectId,
    content: string,
    userId: ObjectId
  ): Promise<CommentViewModel | null> {
    const post = await postsQueryRepository.findPostById(new ObjectId(postId));

    if (!post) {
      return null;
    }

    const user = await usersService.findUserById(userId);

    const newComment = new CommentDBModel(
      new ObjectId(),
      content,
      { userId: user!._id.toString(), userLogin: user!.accountData.login },
      postId.toString(),
      new Date().toISOString()
    );

    return commentsRepository.createComment(newComment);
  }

  async updateComment(
    _id: ObjectId,
    comment: CommentViewModel
  ): Promise<boolean> {
    return commentsRepository.updateComment(_id, comment.content);
  }

  async deleteComment(_id: ObjectId): Promise<boolean> {
    return commentsRepository.deleteComment(_id);
  }

  async deleteAll(): Promise<boolean> {
    return commentsRepository.deleteAll();
  }
}

export const commentsService = new CommentsService();