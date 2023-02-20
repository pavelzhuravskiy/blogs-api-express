import { blogsRepository } from "../repositories/mongodb/blogs-repository-mongodb";
import { BlogMongoModelNoId } from "../models/BlogMongoModelNoId";
import { ObjectId } from "mongodb";

export const blogsService = {
  // Return all blogs
  async findAllBlogs(): Promise<BlogMongoModelNoId[]> {
    return blogsRepository.findAllBlogs();
  },

  // Return blog by ID
  async findBlogById(
    _id: ObjectId
  ): Promise<boolean | (BlogMongoModelNoId & { id: string })> {
    return blogsRepository.findBlogById(_id);
  },

  // Create new blog
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
  ): Promise<BlogMongoModelNoId> {
    const newBlog = {
      name: name,
      description: description,
      websiteUrl: websiteUrl,
      createdAt: createdAt,
      isMembership: isMembership,
    };
    return blogsRepository.createNewBlog(newBlog);
  },

  // Update existing blog
  async updateBlog(
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    return blogsRepository.updateBlog(_id, name, description, websiteUrl);
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