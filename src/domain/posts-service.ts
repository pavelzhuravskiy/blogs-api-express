import { ObjectId } from "mongodb";
import { postsRepository } from "../repositories/posts-repository";
import { PostDBModel } from "../models/database/PostDBModel";
import { PostViewModel } from "../models/view/PostViewModel";
import { blogsQueryRepository } from "../repositories/query-repos/blogs-query-repository";

export const postsService = {
  // Create new post
  async createPost(
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<PostViewModel | null> {
    const blog = await blogsQueryRepository.findBlogById(new ObjectId(blogId));

    if (!blog) {
      return null;
    }

    const newPost = new PostDBModel(
      new ObjectId(),
      title,
      shortDescription,
      content,
      blogId,
      blog.name,
      new Date().toISOString()
    );

    return postsRepository.createPost(newPost);
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