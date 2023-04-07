import { ObjectId } from "mongodb";
import { CommentViewModel } from "../models/view/CommentViewModel";
import { PostsQueryRepository } from "../repositories/query-repos/posts-query-repository";
import { CommentsRepository } from "../repositories/comments-repository";
import { CommentDBModel, UserLikes } from "../models/database/CommentDBModel";
import { UsersService } from "./users-service";
import { CommentsQueryRepository } from "../repositories/query-repos/comments-query-repository";

export class CommentsService {
  constructor(
    protected usersService: UsersService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
    protected commentsRepository: CommentsRepository
  ) {}
  async createComment(
    postId: ObjectId,
    content: string,
    userId: ObjectId
  ): Promise<CommentViewModel | null> {
    const post = await this.postsQueryRepository.findPostById(
      new ObjectId(postId)
    );

    if (!post) {
      return null;
    }

    const user = await this.usersService.findUserById(userId);

    const newComment = new CommentDBModel(
      new ObjectId(),
      content,
      { userId: user!._id.toString(), userLogin: user!.accountData.login },
      postId.toString(),
      new Date().toISOString(),
      {
        likesCount: 0,
        dislikesCount: 0,
        users: [new UserLikes(userId.toString(), "None")],
      }
    );

    return this.commentsRepository.createComment(newComment);
  }

  async updateComment(
    _id: ObjectId,
    comment: CommentViewModel
  ): Promise<boolean> {
    return this.commentsRepository.updateComment(_id, comment.content);
  }

  async deleteComment(_id: ObjectId): Promise<boolean> {
    return this.commentsRepository.deleteComment(_id);
  }

  async deleteAll(): Promise<boolean> {
    return this.commentsRepository.deleteAll();
  }

  async updateLikeStatus(
    commentId: ObjectId,
    likeStatus: string,
    userId: ObjectId
  ): Promise<boolean> {
    const foundComment = await this.commentsQueryRepository.findCommentById(
      commentId
    );

    if (!foundComment) {
      return false;
    }

    let likesCount = foundComment.likesInfo.likesCount;
    let dislikesCount = foundComment.likesInfo.dislikesCount;

    const foundUser = await this.commentsRepository.findUserInLikesInfo(
      commentId,
      userId
    );

    if (!foundUser) {
      await this.commentsRepository.pushUserInLikesInfo(
        commentId,
        userId,
        likeStatus
      );

      if (likeStatus === "Like") {
        likesCount++;
      }

      if (likeStatus === "Dislike") {
        dislikesCount++;
      }

      return this.commentsRepository.updateLikesCount(
        commentId,
        likesCount,
        dislikesCount
      );
    }

    let userLikeDBStatus = await this.commentsRepository.findUserLikeStatus(
      commentId,
      userId
    );

    switch (userLikeDBStatus) {
      case "None":
        if (likeStatus === "Like") {
          likesCount++;
        }

        if (likeStatus === "Dislike") {
          dislikesCount++;
        }

        break;

      case "Like":
        if (likeStatus === "None") {
          likesCount--;
        }

        if (likeStatus === "Dislike") {
          likesCount--;
          dislikesCount++;
        }
        break;

      case "Dislike":
        if (likeStatus === "None") {
          dislikesCount--;
        }

        if (likeStatus === "Like") {
          dislikesCount--;
          likesCount++;
        }
    }

    await this.commentsRepository.updateLikesCount(
      commentId,
      likesCount,
      dislikesCount
    );

    return this.commentsRepository.updateLikesStatus(
      commentId,
      userId,
      likeStatus
    );
  }
}