import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import {
  MongoBlogModel,
  MongoBlogModelWithId,
  MongoBlogModelWithStringId,
} from "../models/mongodb/MongoBlogModel";
import { ObjectId } from "mongodb";

export const blogsService = {
  // Return all blogs
  async findBlogs(
    searchNameTerm: string | null,
    sortBy: string | "createdAt",
    sortDirection: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MongoBlogModelWithId[]> {
    return blogsRepository.findBlogs(
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize
    );
  },

  // Return blog by ID
  async findBlogById(
    _id: ObjectId
  ): Promise<boolean | MongoBlogModelWithStringId> {
    return blogsRepository.findBlogById(_id);
  },

  // Create new blog
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
  ): Promise<MongoBlogModel> {
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