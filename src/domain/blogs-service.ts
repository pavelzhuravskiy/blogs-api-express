import { blogsRepository } from "../repositories/blogs/mongodb-blogs-repository";
import { MongoBlogModel } from "../models/blogs/MongoBlogModel";
import { ObjectId } from "mongodb";

export const blogsService = {
  // Create new blog
  async createNewBlog(blog: MongoBlogModel): Promise<MongoBlogModel> {
    const newBlog = {
      ...blog,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return blogsRepository.createNewBlog(newBlog);
  },

  // Update existing blog
  async updateBlog(_id: ObjectId, blog: MongoBlogModel): Promise<boolean> {
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