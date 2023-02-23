import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/mongodb/mongodb-posts-repository";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModelWithId";
import { MongoPostModelWithStringId } from "../models/mongodb/MongoPostModelWithStringId";
import { MongoPostModelWithPagination } from "../models/mongodb/MongoPostModelWithPagination";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { MongoPostQueryModel } from "../models/mongodb/MongoPostQueryModel";
import { MongoPostModel } from "../models/mongodb/MongoPostModel";

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

  // Return all posts by Blog ID

  async findPostsByBlogId(
    blogId: ObjectId,
    post: MongoPostQueryModel
  ): Promise<MongoPostModelWithPagination> {
    return postsRepository.findPostsByBlogId(
      blogId,
      post.pageNumber,
      post.pageSize,
      post.sortBy,
      post.sortDirection
    );
  },

  // Create new post
  async createNewPost(
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsRepository.findBlogById(new ObjectId(post.blogId));
    if (!blog) {
      return false;
    }
    const newPost = {
      ...post,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    return postsRepository.createNewPost(newPost);
  },

  // Create new post
  async createNewPostByBlogId(
    _id: ObjectId,
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsRepository.findBlogById(new ObjectId(_id));
    if (!blog) {
      return false;
    }
    const newPost = {
      ...post,
      blogId: _id.toString(),
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    return postsRepository.createNewPost(newPost);
  },

  // Update existing post
  async updatePost(_id: ObjectId, post: MongoPostModel): Promise<boolean> {
    return postsRepository.updatePost(
      _id,
      post.title,
      post.shortDescription,
      post.content,
      post.blogId
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