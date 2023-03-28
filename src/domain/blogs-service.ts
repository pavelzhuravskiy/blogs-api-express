import { blogsRepository } from "../repositories/mongodb-blogs-repository";
import { BlogDBModel } from "../models/blogs/BlogDBModel";
import { ObjectId } from "mongodb";
import { BlogViewModel } from "../models/blogs/BlogViewModel";

export const blogsService = {
  // Create new blog
  async createNewBlog(blog: BlogDBModel): Promise<BlogViewModel> {
    const newBlog = {
      ...blog,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return blogsRepository.createNewBlog(newBlog);
  },

  // Update existing blog
  async updateBlog(_id: ObjectId, blog: BlogDBModel): Promise<boolean> {
    return blogsRepository.updateBlog(
      _id,
      blog.name,
      blog.description,
      blog.websiteUrl
    );
  },

  // Delete existing blog
  async deleteBlog(_id: ObjectId): Promise<boolean> {
    return blogsRepository.deleteBlog(_id);
  },

  // Delete all blogs
  async deleteAll(): Promise<boolean> {
    return blogsRepository.deleteAll();
  },
};