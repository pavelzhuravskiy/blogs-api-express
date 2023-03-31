import { blogsRepository } from "../repositories/blogs-repository";
import { BlogDBModel } from "../models/database/BlogDBModel";
import { ObjectId } from "mongodb";
import { BlogViewModel } from "../models/view/BlogViewModel";

export const blogsService = {
  // Create new blog
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogViewModel> {
    const newBlog = new BlogDBModel(
      new ObjectId(),
      name,
      description,
      websiteUrl,
      new Date().toISOString(),
      false
    );

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