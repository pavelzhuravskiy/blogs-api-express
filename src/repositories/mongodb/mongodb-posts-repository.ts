import { postsCollection } from "./_mongodb-connect";
import { MongoPostModel } from "../../models/mongodb/MongoPostModel";
import { ObjectId } from "mongodb";
import { MongoPostModelWithStringId } from "../../models/mongodb/MongoPostModelWithStringId";
import { funcSorting } from "../../functions/func-sorting";
import { MongoPostModelWithPagination } from "../../models/mongodb/MongoPostModelWithPagination";
import { funcPostMapping } from "../../functions/func-post-mapping";
import { funcPostsPagination } from "../../functions/func-posts-pagination";

export const postsRepository = {
  // Return all posts
  async findPosts(
    pageNumber: number = 1,
    pageSize: number = 10,
    sortBy: string,
    sortDirection: string
  ): Promise<MongoPostModelWithPagination> {
    const sortingObj: any = {};

    funcSorting(sortingObj, sortBy, sortDirection);

    const output = await funcPostsPagination(sortingObj, pageNumber, pageSize);
    const outputCount = await postsCollection.countDocuments();
    const pagesCount = Math.ceil(outputCount / +pageSize);

    return {
      pagesCount: pagesCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: outputCount,
      items: funcPostMapping(output),
    };
  },

  // Return post by ID
  async findPostById(
    _id: ObjectId
  ): Promise<boolean | MongoPostModelWithStringId> {
    const foundPost = await postsCollection.findOne({ _id });

    if (!foundPost) {
      return false;
    }

    return {
      id: foundPost._id.toString(),
      title: foundPost.title,
      shortDescription: foundPost.shortDescription,
      content: foundPost.content,
      blogId: foundPost.blogId,
      blogName: foundPost.blogName,
      createdAt: foundPost.createdAt,
    };
  },

  // Return posts by blog ID
  async findPostsByBlogId(
    blogId: ObjectId,
    pageNumber: number = 1,
    pageSize: number = 10,
    sortBy: string,
    sortDirection: string
  ): Promise<MongoPostModelWithPagination> {
    const filter = { blogId: blogId.toString() };
    const sortingObj: any = {};

    funcSorting(sortingObj, sortBy, sortDirection);

    const output = await funcPostsPagination(sortingObj, pageNumber, pageSize, filter);
    const outputCount = await postsCollection.countDocuments(filter);
    const pagesCount = Math.ceil(outputCount / +pageSize);

    return {
      pagesCount: pagesCount,
      page: +pageNumber,
      pageSize: +pageSize,
      totalCount: outputCount,
      items: funcPostMapping(output),
    };
  },

  // Create new post
  async createNewPost(
    newPost: MongoPostModel
  ): Promise<boolean | MongoPostModelWithStringId> {
    const insertedPost = await postsCollection.insertOne(newPost);

    return {
      id: insertedPost.insertedId.toString(),
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName,
      createdAt: newPost.createdAt,
    };
  },

  // Update existing post
  async updatePost(
    _id: ObjectId,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
  ): Promise<boolean> {
    const result = await postsCollection.updateOne(
      { _id },
      {
        $set: {
          title: title,
          shortDescription: shortDescription,
          content: content,
          blogId: blogId,
        },
      }
    );

    return result.matchedCount === 1;
  },

  // Delete existing post
  async deletePost(_id: ObjectId): Promise<boolean> {
    const result = await postsCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all post
  async deleteAll(): Promise<boolean> {
    await postsCollection.deleteMany({});
    return (await postsCollection.countDocuments()) === 0;
  },
};