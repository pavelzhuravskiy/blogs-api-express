import { Paginator } from "../../models/view/_Paginator";
import { PostViewModel } from "../../models/view/PostViewModel";
import { Posts } from "../../schemas/postSchema";
import { FilterQuery, SortOrder } from "mongoose";
import { PostDBModel } from "../../models/database/PostDBModel";
import { injectable } from "inversify";

@injectable()
export class PostsQueryRepository {
  async findPosts(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    blogId?: string
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
      .limit(pageSize > 0 ? pageSize : 0)
      .lean();

    const totalCount = await Posts.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      // @ts-ignore // TODO
      items: await this.postsMapping(output),
    };
  }

  async findPostById(_id: string): Promise<PostViewModel | null> {
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
      likesInfo: {
        likesCount: foundPost.likesInfo.likesCount,
        dislikesCount: foundPost.likesInfo.dislikesCount,
        myStatus: "None", // TODO
      },
    };
  }

  private async postsMapping(array: PostDBModel[]) {
    return array.map((post) => {
      return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
      };
    });
  }
}