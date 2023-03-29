import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/mongodb-posts-repository";
import { MongoPostModelWithId } from "../models/posts/MongoPostModelWithId";
import { MongoPostModelWithStringId } from "../models/posts/MongoPostModelWithStringId";
import { MongoPostModel } from "../models/posts/MongoPostModel";
import { blogsQueryRepository } from "../repositories/query-repos/blogs-query-repository";

export const postsService = {
  // Create new post
  async createNewPost(
    post: MongoPostModelWithId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const blog = await blogsQueryRepository.findBlogById(
      new ObjectId(post.blogId)
    );
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
    const blog = await blogsQueryRepository.findBlogById(new ObjectId(_id));
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

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    return postsRepository.deleteAll();
  },
};