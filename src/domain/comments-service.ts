import { ObjectId } from "mongodb";
import { CommentViewModel } from "../models/view/CommentViewModel";
import { PostsQueryRepository } from "../repositories/query-repos/posts-query-repository";
import { CommentsRepository } from "../repositories/comments-repository";
import { CommentDBModel } from "../models/database/CommentDBModel";
import { UsersService } from "./users-service";

export class CommentsService {
  private usersService: UsersService;
  private postsQueryRepository: PostsQueryRepository;
  private commentsRepository: CommentsRepository;
  constructor() {
    this.usersService = new UsersService();
    this.postsQueryRepository = new PostsQueryRepository();
    this.commentsRepository = new CommentsRepository();
  }
  async createComment(
    postId: ObjectId,
    content: string,
    userId: ObjectId
  ): Promise<CommentViewModel | null> {
    const post = await this.postsQueryRepository.findPostById(
      new ObjectId(postId)
    );

    if (!post) {
      return null;
    }

    const user = await this.usersService.findUserById(userId);

    const newComment = new CommentDBModel(
      new ObjectId(),
      content,
      { userId: user!._id.toString(), userLogin: user!.accountData.login },
      postId.toString(),
      new Date().toISOString()
    );

    return this.commentsRepository.createComment(newComment);
  }

  async updateComment(
    _id: ObjectId,
    comment: CommentViewModel
  ): Promise<boolean> {
    return this.commentsRepository.updateComment(_id, comment.content);
  }

  async deleteComment(_id: ObjectId): Promise<boolean> {
    return this.commentsRepository.deleteComment(_id);
  }

  async deleteAll(): Promise<boolean> {
    return this.commentsRepository.deleteAll();
  }
}