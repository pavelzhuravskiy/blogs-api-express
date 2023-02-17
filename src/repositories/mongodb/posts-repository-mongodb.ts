import {postsCollection} from "./_mongodb-connect";
import {PostMongoModelNoId} from "../../models/PostMongoModelNoId";
import {ObjectId} from "mongodb";

export const postsRepository = {
  // Return all posts
  async findAllPosts(): Promise<PostMongoModelNoId[]> {
    return postsCollection.find({}).toArray();
  },

  // Return post by ID
  async findPostById(
      _id: ObjectId
  ): Promise<boolean | (PostMongoModelNoId & { id: string })> {
    const foundPost = await postsCollection.findOne({ _id });

    if (!foundPost) {
      return false;
    }

    return {
      id: foundPost._id.toString(),
      title: foundPost.title,
      shortDescription: foundPost.shortDescription,
      content: foundPost.content,
      blogId: foundPost.blogId,
      blogName: foundPost.blogName,
      createdAt: foundPost.createdAt

    };
  },

  // Create new post
  async createNewPost(
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string,
      createdAt: string

  ): Promise<boolean | (PostMongoModelNoId & { id: string })> {
    const newPost = {
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
      createdAt: createdAt
    };

    const insertedPost = await postsCollection.insertOne(newPost);

    if (!insertedPost) {
      return false;
    }

    return {
      id: insertedPost.insertedId.toString(),
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName,
      createdAt: newPost.createdAt
    };
  },

  // Update existing post
  async updatePost(
      _id: ObjectId,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
        {_id},
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