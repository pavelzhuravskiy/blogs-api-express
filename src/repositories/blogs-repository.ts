import { BlogDBModel } from "../models/database/BlogDBModel";
import { ObjectId } from "mongodb";
import { BlogViewModel } from "../models/view/BlogViewModel";
import { Blogs } from "../schemas/blogSchema";

export const blogsRepository = {
  // Create new blog
  async createNewBlog(newBlog: BlogDBModel): Promise<BlogViewModel> {
    const insertedBlog = await Blogs.create(newBlog);
    return {
      id: insertedBlog._id.toString(),
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership,
    };
  },

  // Update existing blog
  async updateBlog(
    _id: ObjectId,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<boolean> {
    const result = await Blogs.updateOne(
      { _id },
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
  async deleteBlog(_id: ObjectId): Promise<boolean> {
    const result = await Blogs.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all blogs
  async deleteAll(): Promise<boolean> {
    await Blogs.deleteMany({});
    return (await Blogs.countDocuments()) === 0;
  },
};