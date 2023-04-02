import { ObjectId } from "mongodb";
import { funcPostsMapping } from "../../functions/mappings/func-posts-mapping";
import { Paginator } from "../../models/view/_Paginator";
import { PostViewModel } from "../../models/view/PostViewModel";
import { Posts } from "../../schemas/postSchema";
import { FilterQuery, SortOrder } from "mongoose";
import { PostDBModel } from "../../models/database/PostDBModel";

class PostsQueryRepository {
  async findPosts(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    blogId?: ObjectId
  ): Promise<Paginator<PostViewModel[]>> {
    const filter: FilterQuery<PostDBModel> = {};

    if (blogId) {
      filter.blogId = blogId.toString();
    }

    const sortingObj: { [key: string]: SortOrder } = { [sortBy]: "desc" };

    if (sortDirection === "asc") {
      sortingObj[sortBy] = "asc";
    }

    const output = await Posts.find(filter)
      .sort(sortingObj)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : 0);

    const totalCount = await Posts.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / Number(pageSize));

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: funcPostsMapping(output),
    };
  }

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
  }
}

export const postsQueryRepository = new PostsQueryRepository();