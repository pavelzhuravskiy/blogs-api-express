import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/posts-repository";
import { PostDBModel } from "../models/database/PostDBModel";
import { PostViewModel } from "../models/view/PostViewModel";
import { blogsQueryRepository } from "../repositories/query-repos/blogs-query-repository";

export const postsService = {
  // Create new post
  async createNewPost(post: PostDBModel): Promise<boolean | PostViewModel> {
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
    post: PostDBModel
  ): Promise<boolean | PostViewModel> {
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
  async updatePost(_id: ObjectId, post: PostViewModel): Promise<boolean> {
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