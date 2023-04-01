import { PostViewModel } from "../models/view/PostViewModel";
import { ObjectId } from "mongodb";
import { PostDBModel } from "../models/database/PostDBModel";
import { Posts } from "../schemas/postSchema";

export const postsRepository = {
  // Create new post
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
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    const result = await Posts.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    await Posts.deleteMany({});
    return (await Posts.countDocuments()) === 0;
  },
};