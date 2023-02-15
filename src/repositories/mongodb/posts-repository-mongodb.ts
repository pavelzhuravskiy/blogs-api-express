import {postsCollection} from "./_mongodb-connect";
import {PostMongoModel} from "../../models/PostMongoModel";

export const postsRepository = {
  // Return all posts
  async findAllPosts(): Promise<PostMongoModel[]> {
    return postsCollection.find({}).toArray();
  },

  // Return post by ID
  async findPostById(id: string): Promise<PostMongoModel | null> {
    const foundPost = await postsCollection.findOne({id});
    if (foundPost) {
      return foundPost;
    } else {
      return null;
    }
  },

  // Create new post
  async createNewPost(
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string
  ): Promise<PostMongoModel> {
    const newPost: PostMongoModel = {
      id: id,
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
    };
    await postsCollection.insertOne(newPost);
    return newPost;
  },

  // Update existing post
  async updatePost(
      id: string,
      title: string,
      shortDescription: string,
      content: string,
      blogId: string,
      blogName: string
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
        {id: id},
        {
          $set: {
            id: id,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName,
          },
        }
    );

    return result.matchedCount === 1;
  },

  // Delete existing post
  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({id: id});
    return result.deletedCount === 1;
  },
};