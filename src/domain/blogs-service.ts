import { blogsRepository } from "../repositories/blogs-repository";
import { BlogDBModel } from "../models/database/BlogDBModel";
import { ObjectId } from "mongodb";
import { BlogViewModel } from "../models/view/BlogViewModel";

class BlogsService {
  async createBlog(
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

    return blogsRepository.createBlog(newBlog);
  }

  async updateBlog(_id: ObjectId, blog: BlogDBModel): Promise<boolean> {
    return blogsRepository.updateBlog(
      _id,
      blog.name,
      blog.description,
      blog.websiteUrl
    );
  }

  async deleteBlog(_id: ObjectId): Promise<boolean> {
    return blogsRepository.deleteBlog(_id);
  }

  async deleteAll(): Promise<boolean> {
    return blogsRepository.deleteAll();
  }
}

export const blogsService = new BlogsService();