import { ObjectId } from "mongodb";
import { CommentViewModel } from "../models/view/CommentViewModel";
import { PostsQueryRepository } from "../repositories/query-repos/posts-query-repository";
import { CommentsRepository } from "../repositories/comments-repository";
import { CommentDBModel } from "../models/database/CommentDBModel";
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
      { likesCount: 0, dislikesCount: 0, myStatus: "None" }
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

  async updateLikeStatus(_id: ObjectId, likeStatus: string): Promise<boolean> {
    const foundComment = await this.commentsQueryRepository.findCommentById(
      _id
    );

    if (!foundComment) {
      return false;
    }

    let dbLikesCount = foundComment.likesInfo.likesCount;
    let dbDislikesCount = foundComment.likesInfo.dislikesCount;
    let dbLikeStatus = foundComment.likesInfo.myStatus;

    switch (dbLikeStatus) {
      case "None":
        if (likeStatus === "None") {
          return true;
        } else if (likeStatus === "Like") {
          dbLikesCount++;
          dbLikeStatus = "Like"
        } else {
          dbDislikesCount++;
          dbLikeStatus = "Dislike"
        }
        break;

      case "Like":
        if (likeStatus === "None") {
          dbLikesCount--
          dbLikeStatus = "None";
        } else if (likeStatus === "Like") {
          return true;
        } else {
          dbLikesCount--;
          dbDislikesCount++;
          dbLikeStatus = "Dislike"
        }
        break;

      case "Dislike":
        if (likeStatus === "None") {
          dbDislikesCount--;
          dbLikeStatus = "None"
        } else if (likeStatus === "Like") {
          dbDislikesCount--
          dbLikesCount++
          dbLikeStatus = "Like"
        } else {
          return true;
        }
    }

    return this.commentsRepository.updateLikeStatus(_id, dbLikesCount, dbDislikesCount, dbLikeStatus);

  }
}