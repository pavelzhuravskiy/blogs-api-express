import { BlogDBModel } from "../models/database/BlogDBModel";
import { BlogViewModel } from "../models/view/BlogViewModel";
import { Blogs } from "../schemas/blogSchema";
import { injectable } from "inversify";

@injectable()
export class BlogsRepository {
  async createBlog(newBlog: BlogDBModel): Promise<BlogViewModel> {
    const insertedBlog = await Blogs.create(newBlog);
    return {
      id: insertedBlog._id.toString(),
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership,
    };
  }

  async updateBlog(
    _id: string,
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
  }

  async deleteBlog(_id: string): Promise<boolean> {
    const result = await Blogs.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await Blogs.deleteMany({});
    return (await Blogs.countDocuments()) === 0;
  }

  async findBlogById(_id: string): Promise<BlogDBModel | null> {
    return Blogs.findOne({ _id });
  }
}