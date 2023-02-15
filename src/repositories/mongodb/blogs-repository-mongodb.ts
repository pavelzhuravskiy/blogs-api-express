import { BlogMemoryModel } from "../../models/BlogMemoryModel";
import { client } from "./mongodb-connect";
import { BlogMongoModel } from "../../models/BlogMongoModel";

export const blogsRepository = {
  // Return all blogs
  async findAllBlogs(): Promise<BlogMongoModel[]> {
    return client
      .db("bp")
      .collection<BlogMongoModel>("blogs")
      .find({})
      .toArray();
  },

  // Return blog by ID
  async findBlogById(id: string): Promise<BlogMongoModel | null> {
    const foundBlog = await client
      .db("bp")
      .collection<BlogMongoModel>("blogs")
      .findOne({ id });
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
  ): Promise<BlogMemoryModel> {
    const newBlog = {
      id: id,
      name: name,
      description: description,
      websiteUrl: websiteUrl,
    };
    await client
      .db("bp")
      .collection<BlogMongoModel>("blogs")
      .insertOne(newBlog);
    return newBlog;
  },

  // Update existing blog
  async updateBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await client
      .db("bp")
      .collection<BlogMongoModel>("blogs")
      .updateOne(
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
    const result = await client
      .db("bp")
      .collection<BlogMongoModel>("blogs")
      .deleteOne({id: id});
    return result.deletedCount === 1;
  },
};