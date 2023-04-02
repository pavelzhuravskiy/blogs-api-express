import { ObjectId } from "mongodb";
import { CommentViewModel } from "../../models/view/CommentViewModel";
import { Comments } from "../../schemas/commentSchema";
import { FilterQuery, SortOrder } from "mongoose";
import { Paginator } from "../../models/view/_Paginator";
import { CommentDBModel } from "../../models/database/CommentDBModel";
import { funcCommentsMapping } from "../../functions/mappings/func-comments-mapping";

export class CommentsQueryRepository {
  async findComments(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    postId: ObjectId
  ): Promise<Paginator<CommentViewModel[]>> {
    const filter: FilterQuery<CommentDBModel> = { postId: postId.toString() };

    const sortingObj: { [key: string]: SortOrder } = { [sortBy]: "desc" };

    if (sortDirection === "asc") {
      sortingObj[sortBy] = "asc";
    }

    const output = await Comments.find(filter)
      .sort(sortingObj)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : 0);

    const totalCount = await Comments.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / Number(pageSize));

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: funcCommentsMapping(output),
    };
  }

  async findCommentById(_id: ObjectId): Promise<CommentViewModel | null> {
    const foundComment = await Comments.findOne({ _id });

    if (!foundComment) {
      return null;
    }

    return {
      id: foundComment._id.toString(),
      content: foundComment.content,
      commentatorInfo: {
        userId: foundComment.commentatorInfo.userId,
        userLogin: foundComment.commentatorInfo.userLogin,
      },
      createdAt: foundComment.createdAt,
    };
  }
}