import { postsCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { MongoPostModelWithStringId } from "../models/posts/MongoPostModelWithStringId";
import { funcPostMapping } from "../functions/mappings/func-post-mapping";
import { MongoPostModelWithPagination } from "../models/posts/MongoPostModelWithPagination";
import { funcSorting } from "../functions/global/func-sorting";
import { funcPagination } from "../functions/global/func-pagination";
import { funcOutput } from "../functions/global/func-output";
import { funcFilter } from "../functions/global/func-filter";

export const postsQueryRepository = {
  // Return posts with query
  async findPosts(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
    blogId?: ObjectId
  ): Promise<MongoPostModelWithPagination> {
    // Filter
    const postsFilter = await funcFilter(blogId);

    // Pagination
    const postsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      postsCollection,
      postsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      postsPagination,
      postsCollection,
      funcPostMapping,
      postsFilter
    );
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
};