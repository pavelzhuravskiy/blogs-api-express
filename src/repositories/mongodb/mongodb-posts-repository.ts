import { postsCollection } from "./_mongodb-connect";
import { MongoPostModel } from "../../models/mongodb/MongoPostModel";
import { ObjectId } from "mongodb";
import { MongoPostModelWithStringId } from "../../models/mongodb/MongoPostModelWithStringId";

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

  // Delete all post
  async deleteAll(): Promise<boolean> {
    await postsCollection.deleteMany({});
    return (await postsCollection.countDocuments()) === 0;
  },
};