import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { MongoBlogModel } from "../models/mongodb/MongoBlogModel";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../models/mongodb/MongoBlogModelWithStringId";
import { MongoBlogModelWithPagination } from "../models/mongodb/MongoBlogModelWithPagination";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";

export const blogsService = {
  // Return blogs
  async findBlogs(
    blog: MongoBlogQueryModel
  ): Promise<boolean | MongoBlogModelWithPagination> {
    return blogsRepository.findBlogs(
      blog.searchNameTerm,
      blog.sortBy,
      blog.sortDirection,
      blog.pageNumber,
      blog.pageSize
    );
  },

  // Return blog by ID
  async findBlogById(
    _id: ObjectId
  ): Promise<boolean | MongoBlogModelWithStringId> {
    return blogsRepository.findBlogById(_id);
  },

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