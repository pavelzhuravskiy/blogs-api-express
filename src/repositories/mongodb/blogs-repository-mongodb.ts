import { blogsCollection } from "./_mongodb-connect";
import { BlogMongoModel } from "../../models/BlogMongoModel";

export const blogsRepository = {
  // Return all blogs
  async findAllBlogs(): Promise<BlogMongoModel[]> {
    return blogsCollection.find({}).toArray();
  },

  // Return blog by ID
  async findBlogById(id: string): Promise<BlogMongoModel | null> {
    const foundBlog = await blogsCollection.findOne({ id });
    if (foundBlog) {
      return foundBlog;
    } else {
      return null;
    }
  },

  // Create new blog
  async createNewBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<BlogMongoModel> {
    const newBlog = {
      id: id,
      name: name,
      description: description,
      websiteUrl: websiteUrl,
    };
    await blogsCollection.insertOne(newBlog);
    return newBlog;
  },

  // Update existing blog
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await blogsCollection.updateOne(
      { id: id },
      {
        $set: {
          name: name,
          description: description,
          websiteUrl: websiteUrl,
        },
      }
    );
    return result.matchedCount === 1;
  },

  // Delete existing blog
  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  },
};