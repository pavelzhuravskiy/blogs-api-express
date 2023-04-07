import { CommentViewModel } from "../models/view/CommentViewModel";
import { ObjectId } from "mongodb";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { Comments } from "../schemas/commentSchema";

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
  }

  async deleteComment(_id: ObjectId): Promise<boolean> {
    const result = await Comments.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await Comments.deleteMany({});
    return (await Comments.countDocuments()) === 0;
  }

  async findUserInLikesInfo(commentId: ObjectId, userId: ObjectId): Promise<CommentDBModel | null> {
    const foundUser = await Comments.findOne(
      Comments.findOne({_id: commentId, "likesInfo.users.userId": userId })
    );

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findUserLikeStatus(
    commentId: ObjectId,
    userId: ObjectId
  ): Promise<string | null> {

    // console.log(commentId)
    // console.log(userId)

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
    commentId: ObjectId,
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
    commentId: ObjectId,
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
    commentId: ObjectId,
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
}