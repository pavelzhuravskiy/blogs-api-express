import {commentsCollection, postsCollection} from "../global/_mongodb-connect";
import { MongoPostModel } from "../../models/posts/MongoPostModel";
import { ObjectId } from "mongodb";
import { MongoPostModelWithStringId } from "../../models/posts/MongoPostModelWithStringId";
import {MongoCommentsModel} from "../../models/comments/MongoCommentsModel";
import {
  MongoCommentModelWithStringId
} from "../../models/comments/MongoCommentModelWithStringId";

export const postsRepository = {
  // Create new post
  async createNewPost(
    newPost: MongoPostModel
  ): Promise<boolean | MongoPostModelWithStringId> {
    const insertedPost = await postsCollection.insertOne(newPost);

    return {
      id: insertedPost.insertedId.toString(),
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName,
      createdAt: newPost.createdAt,
    };
  },

  // Update existing post
  async updatePost(
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
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
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    const result = await postsCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Create new comment
  async createNewComment(
      newComment: MongoCommentsModel
  ): Promise<boolean | MongoCommentModelWithStringId> {
    const insertedComment = await commentsCollection.insertOne(newComment);

    return {
      id: insertedComment.insertedId.toString(),
      content: newComment.content,
      commentatorInfo: {
        userId: newComment.commentatorInfo.userId,
        userLogin: newComment.commentatorInfo.userLogin,
      },
      createdAt: newComment.createdAt
    };
  },

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    await postsCollection.deleteMany({});
    return (await postsCollection.countDocuments()) === 0;
  },
};