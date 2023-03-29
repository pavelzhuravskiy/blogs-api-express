import { ObjectId } from "mongodb";
import { funcPostsMapping } from "../functions/mappings/func-posts-mapping";
import { funcSorting } from "../functions/global/func-sorting";
import { funcPagination } from "../functions/global/func-pagination";
import { funcOutput } from "../functions/global/func-output";
import { funcFilter } from "../functions/global/func-filter";
import { Paginator } from "../models/global/Paginator";
import { PostViewModel } from "../models/posts/PostViewModel";
import { Posts } from "../schemas/postSchema";

export const postsQueryRepository = {
  // Return posts with query
  async findPosts(
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string,
    blogId?: ObjectId
  ): Promise<Paginator<PostViewModel[]>> {
    // Filter
    const postsFilter = await funcFilter(blogId);

    // Pagination
    const postsPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      Posts,
      postsFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      postsPagination,
      Posts,
      funcPostsMapping,
      postsFilter
    );
  },

  // Return post by ID
  async findPostById(_id: ObjectId): Promise<PostViewModel | null> {
    const foundPost = await Posts.findOne({ _id });

    if (!foundPost) {
      return null;
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