import {
  MongoPostModel,
  MongoPostModelWithId,
} from "../models/mongodb/MongoPostModel";
import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/posts-repository-mongodb";

export const postsService = {
  // Return all posts
  async findAllPosts(): Promise<MongoPostModelWithId[]> {
    return postsRepository.findAllPosts();
  },

  // Return post by ID
  async findPostById(
    _id: ObjectId
  ): Promise<boolean | (MongoPostModel & { id: string })> {
    return postsRepository.findPostById(_id);
  },

  // Create new post
  async createNewPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
  ): Promise<boolean | (MongoPostModel & { id: string })> {
    const newPost = {
      title: title,
      shortDescription: shortDescription,
      content: content,
      blogId: blogId,
      blogName: blogName,
      createdAt: createdAt,
    };

    return postsRepository.createNewPost(newPost);
  },

  // Update existing post
  async updatePost(
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    return postsRepository.updatePost(
      _id,
      title,
      shortDescription,
      content,
      blogId
    );
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    return postsRepository.deletePost(_id);
  },

  // Delete all post
  async deleteAll(): Promise<boolean> {
    return postsRepository.deleteAll();
  },
};