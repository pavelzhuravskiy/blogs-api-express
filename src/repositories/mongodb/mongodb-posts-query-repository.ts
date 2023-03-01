import { postsCollection } from "./_mongodb-connect";
import { Document, ObjectId, Sort } from "mongodb";
import { MongoPostModelWithStringId } from "../../models/mongodb/MongoPostModelWithStringId";
import { MongoPostModelWithPagination } from "../../models/mongodb/MongoPostModelWithPagination";
import { funcPostMapping } from "../../functions/func-post-mapping";
import { funcPostsPagination } from "../../functions/func-posts-pagination";

export const postsQueryRepository = {
  // Return posts
  async findPosts(
    blogId: ObjectId | null = null,
    pageNumber: number = 1,
    pageSize: number = 10,
    sortBy: string = "createdAt",
    sortDirection: string = "desc"
  ): Promise<MongoPostModelWithPagination> {
    const filter: Document = {};
    const sortingObj: Sort = {};

    if (blogId) {
      filter.blogId = blogId.toString();
    }

    if (sortBy) {
      sortingObj[sortBy] = -1;
    }

    if (sortDirection === "asc") {
      sortingObj[sortBy] = 1;
    }

    const output = await funcPostsPagination(
      sortingObj,
      pageNumber,
      pageSize,
      filter
    );
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