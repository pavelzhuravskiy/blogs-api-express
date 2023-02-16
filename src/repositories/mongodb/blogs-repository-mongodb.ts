import { blogsCollection } from "./_mongodb-connect";
import { BlogMongoModelNoId } from "../../models/BlogMongoModelNoId";
import { ObjectId } from "mongodb";

export const blogsRepository = {
  // Return all blogs
  async findAllBlogs(): Promise<BlogMongoModelNoId[]> {
    return blogsCollection.find({}).toArray();
  },

  // Return blog by ID
  async findBlogById(_id: ObjectId): Promise<boolean | (BlogMongoModelNoId & { id: string; })> {

    const foundBlog = await blogsCollection.findOne({ _id });

    if(!foundBlog){
      return false
    }

    return {
      id: foundBlog._id.toString(),
      name: foundBlog.name,
      description: foundBlog.description,
      websiteUrl: foundBlog.websiteUrl,
      createdAt: foundBlog.createdAt,
      isMembership: foundBlog.isMembership
    }

  },

  // Create new blog
  async createNewBlog(
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
  ): Promise<boolean | (BlogMongoModelNoId & { id: string; })> {

    const newBlog = {
      name: name,
      description: description,
      websiteUrl: websiteUrl,
      createdAt: createdAt,
      isMembership: isMembership,
    };

    const insertedBlog = await blogsCollection.insertOne(newBlog);

    if(!insertedBlog){
      return false
    }

    return {
      id: insertedBlog.insertedId.toString(),
      name: newBlog.name,
      description: newBlog.description,
      websiteUrl: newBlog.websiteUrl,
      createdAt: newBlog.createdAt,
      isMembership: newBlog.isMembership
    }
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

  // Delete all blogs

  async deleteAll(): Promise<boolean> {
    await blogsCollection.deleteMany({});
    return (await blogsCollection.countDocuments()) === 0;
  },
};