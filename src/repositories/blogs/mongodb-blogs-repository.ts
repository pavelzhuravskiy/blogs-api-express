import { blogsCollection } from "../global/_mongodb-connect";
import { MongoBlogModel } from "../../models/blogs/MongoBlogModel";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/blogs/MongoBlogModelWithStringId";

export const blogsRepository = {
  // Create new blog
  async createNewBlog(
    newBlog: MongoBlogModel
  ): Promise<MongoBlogModelWithStringId> {
    const insertedBlog = await blogsCollection.insertOne(newBlog);

    return {
      id: insertedBlog.insertedId.toString(),
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
    const result = await blogsCollection.updateOne(
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
    const result = await blogsCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all blogs
  async deleteAll(): Promise<boolean> {
    await blogsCollection.deleteMany({});
    return (await blogsCollection.countDocuments()) === 0;
  },
};