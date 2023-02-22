import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/mongodb/mongodb-posts-repository";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModelWithId";
import { MongoPostModelWithStringId } from "../models/mongodb/MongoPostModelWithStringId";
import { MongoPostModelWithPagination } from "../models/mongodb/MongoPostModelWithPagination";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import {MongoPostQueryModel} from "../models/mongodb/MongoPostQueryModel";

export const postsService = {
  // Return posts
  async findPosts(
      post: MongoPostQueryModel
  ): Promise<MongoPostModelWithPagination> {
    return postsRepository.findPosts(
      post.pageNumber,
      post.pageSize,
      post.sortBy,
      post.sortDirection
    );
  },

  // Return post by ID
  async findPostById(
    _id: ObjectId
  ): Promise<boolean | MongoPostModelWithStringId> {
    return postsRepository.findPostById(_id);
  },

  // Create new post
  async createNewPost(
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsRepository.findBlogById(new ObjectId(post.blogId));
    if (!blog) {
      return false
    }
    const newPost = {
      ...post,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
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