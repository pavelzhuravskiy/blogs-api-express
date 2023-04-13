import { PostViewModel } from "../models/view/PostViewModel";
import { ObjectId } from "mongodb";
import { PostDBModel } from "../models/database/PostDBModel";
import { Posts } from "../schemas/postSchema";
import { injectable } from "inversify";

@injectable()
export class PostsRepository {
  async createPost(newPost: PostDBModel): Promise<PostViewModel> {
    const insertedPost = await Posts.create(newPost);

    return {
      id: insertedPost._id.toString(),
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName,
      createdAt: newPost.createdAt,
      likesInfo: {
        likesCount: newPost.likesInfo.likesCount,
        dislikesCount: newPost.likesInfo.dislikesCount,
        myStatus: "None",
      },
    };
  }

  async updatePost(
    _id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await Posts.updateOne(
      { _id },
      {
        $set: {
          title: title,
          shortDescription: shortDescription,
          content: content,
          blogId: blogId,
        },
      }
    );

    return result.matchedCount === 1;
  }

  async deletePost(_id: string): Promise<boolean> {
    const result = await Posts.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await Posts.deleteMany({});
    return (await Posts.countDocuments()) === 0;
  }

  async findUserInLikesInfo(
    postId: string,
    userId: ObjectId
  ): Promise<PostDBModel | null> {
    const foundUser = await Posts.findOne(
      Posts.findOne({ _id: postId, "likesInfo.users.userId": userId })
    );

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async pushUserInLikesInfo(
    postId: string,
    userId: ObjectId,
    likeStatus: string
  ): Promise<boolean> {
    const result = await Posts.updateOne(
      { _id: postId },
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

  async findUserLikeStatus(
    postId: string,
    userId: ObjectId
  ): Promise<string | null> {
    const foundUser = await Posts.findOne(
      { _id: postId },
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

  async updateLikesCount(
    postId: string,
    likesCount: number,
    dislikesCount: number
  ): Promise<boolean> {
    const result = await Posts.updateOne(
      { _id: postId },
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
    postId: string,
    userId: ObjectId,
    likeStatus: string
  ): Promise<boolean> {
    const result = await Posts.updateOne(
      { _id: postId, "likesInfo.users.userId": userId },
      {
        $set: {
          "likesInfo.users.$.likeStatus": likeStatus,
        },
      }
    );
    return result.matchedCount === 1;
  }

  async findPostById(_id: string): Promise<PostDBModel | null> {
    return Posts.findOne({ _id });
  }
}