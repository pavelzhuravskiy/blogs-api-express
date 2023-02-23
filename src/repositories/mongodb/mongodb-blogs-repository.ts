import { blogsCollection } from "./_mongodb-connect";
import { MongoBlogModel } from "../../models/mongodb/MongoBlogModel";
import { ObjectId } from "mongodb";
import { MongoBlogModelWithStringId } from "../../models/mongodb/MongoBlogModelWithStringId";
import { MongoBlogModelWithPagination } from "../../models/mongodb/MongoBlogModelWithPagination";
import { funcBlogMapping } from "../../functions/func-blog-mapping";
import { funcSorting } from "../../functions/func-sorting";
import { funcBlogsPagination } from "../../functions/func-blogs-pagination";

export const blogsRepository = {
  // Return blogs with filter
  async findBlogs(
    searchNameTerm: string | null,
    sortBy: string,
    sortDirection: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<MongoBlogModelWithPagination> {
    const filter: any = {};
    const sortingObj: any = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    funcSorting(sortingObj, sortBy, sortDirection);

    const output = await funcBlogsPagination(
      filter,
      sortingObj,
      pageNumber,
      pageSize
    );
    const outputCount = await blogsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(outputCount / +pageSize);

    return {
      pagesCount: pagesCount | 0,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: outputCount,
      items: funcBlogMapping(output),
    };
  },

  // Return blog by ID
  async findBlogById(
    _id: ObjectId
  ): Promise<false | MongoBlogModelWithStringId> {
    const foundBlog = await blogsCollection.findOne({ _id });

    if (!foundBlog) {
      return false;
    }

    return {
      id: foundBlog._id.toString(),
      name: foundBlog.name,
      description: foundBlog.description,
      websiteUrl: foundBlog.websiteUrl,
      createdAt: foundBlog.createdAt,
      isMembership: foundBlog.isMembership,
    };
  },

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