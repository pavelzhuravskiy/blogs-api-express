import { ObjectId } from "mongodb";
import { CommentViewModel } from "../../models/view/CommentViewModel";
import { Comments } from "../../schemas/commentSchema";
import { FilterQuery, SortOrder } from "mongoose";
import { Paginator } from "../../models/view/_Paginator";
import { CommentDBModel } from "../../models/database/CommentDBModel";
import { funcCommentsMapping } from "../../functions/mappings/func-comments-mapping";
import { injectable } from "inversify";
import { commentsRepository } from "../../composition-root";

@injectable()
export class CommentsQueryRepository {
  async findComments(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    postId: ObjectId,
    userId?: ObjectId
  ): Promise<Paginator<CommentViewModel[]>> {
    const filter: FilterQuery<CommentDBModel> = { postId: postId.toString() };

    const sortingObj: { [key: string]: SortOrder } = { [sortBy]: "desc" };

    if (sortDirection === "asc") {
      sortingObj[sortBy] = "asc";
    }

    const output = await Comments.find(filter)
      .sort(sortingObj)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : 0)
      .lean();

    const totalCount = await Comments.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: await funcCommentsMapping(output, userId),
    };
  }

  async findCommentById(
    _id: ObjectId,
    userId?: ObjectId
  ): Promise<CommentViewModel | null> {
    const foundComment = await Comments.findOne({ _id });

    if (!foundComment) {
      return null;
    }

    let status;

    if (userId) {
      status = await commentsRepository.findUserLikeStatus(_id, userId);
    }

    return {
      id: foundComment._id.toString(),
      content: foundComment.content,
      commentatorInfo: {
        userId: foundComment.commentatorInfo.userId,
        userLogin: foundComment.commentatorInfo.userLogin,
      },
      createdAt: foundComment.createdAt,
      likesInfo: {
        likesCount: foundComment.likesInfo.likesCount,
        dislikesCount: foundComment.likesInfo.dislikesCount,
        myStatus: status || "None",
      },
    };
  }
}