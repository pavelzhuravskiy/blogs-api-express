import { CommentViewModel } from "../models/view/CommentViewModel";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { Comments } from "../schemas/commentSchema";
import { injectable } from "inversify";
import {ObjectId} from "mongodb";

@injectable()
export class CommentsRepository {
  async createComment(newComment: CommentDBModel): Promise<CommentViewModel> {
    const insertedComment = await Comments.create(newComment);

    return {
      id: insertedComment._id.toString(),
      content: newComment.content,
      commentatorInfo: {
        userId: newComment.commentatorInfo.userId,
        userLogin: newComment.commentatorInfo.userLogin,
      },
      createdAt: newComment.createdAt,
      likesInfo: {
        likesCount: newComment.likesInfo.likesCount,
        dislikesCount: newComment.likesInfo.dislikesCount,
        myStatus: "None",
      },
    };
  }

  async updateComment(_id: string, content: string): Promise<boolean> {
    const result = await Comments.updateOne(
      { _id },
      {
        $set: {
          content: content,
        },
      }
    );
    return result.matchedCount === 1;
  }

  async deleteComment(_id: string): Promise<boolean> {
    const result = await Comments.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await Comments.deleteMany({});
    return (await Comments.countDocuments()) === 0;
  }

  async findUserInLikesInfo(
    commentId: string,
    userId: ObjectId
  ): Promise<CommentDBModel | null> {
    const foundUser = await Comments.findOne(
      Comments.findOne({ _id: commentId, "likesInfo.users.userId": userId })
    );

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findUserLikeStatus(
    commentId: string,
    userId: ObjectId
  ): Promise<string | null> {
    const foundUser = await Comments.findOne(
      { _id: commentId },
      {
        "likesInfo.users": {
          $filter: {
            input: "$likesInfo.users",
            cond: { $eq: ["$$this.userId", userId.toString()] },
          },
        },
      }
    );

    if (!foundUser || foundUser.likesInfo.users.length === 0) {
      return null;
    }

    return foundUser.likesInfo.users[0].likeStatus;
  }

  async pushUserInLikesInfo(
    commentId: string,
    userId: ObjectId,
    likeStatus: string
  ): Promise<boolean> {
    const result = await Comments.updateOne(
      { _id: commentId },
      {
        $push: {
          "likesInfo.users": {
            userId,
            likeStatus,
          },
        },
      }
    );
    return result.matchedCount === 1;
  }

  async updateLikesCount(
    commentId: string,
    likesCount: number,
    dislikesCount: number
  ): Promise<boolean> {
    const result = await Comments.updateOne(
      { _id: commentId },
      {
        $set: {
          "likesInfo.likesCount": likesCount,
          "likesInfo.dislikesCount": dislikesCount,
        },
      }
    );
    return result.matchedCount === 1;
  }

  async updateLikesStatus(
    commentId: string,
    userId: ObjectId,
    likeStatus: string
  ): Promise<boolean> {
    const result = await Comments.updateOne(
      { _id: commentId, "likesInfo.users.userId": userId },
      {
        $set: {
          "likesInfo.users.$.likeStatus": likeStatus,
        },
      }
    );
    return result.matchedCount === 1;
  }

  async findCommentById(_id: string): Promise<CommentDBModel | null> {
    return Comments.findOne({ _id });
  }
}