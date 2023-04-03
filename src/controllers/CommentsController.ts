import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { CommentsQueryRepository } from "../repositories/query-repos/comments-query-repository";
import { CommentsService } from "../domain/comments-service";

export class CommentsController {
  constructor(
    protected commentsService: CommentsService,
    protected commentsQueryRepository: CommentsQueryRepository
  ) {}
  async getComment(req: Request, res: Response) {
    const foundComment = await this.commentsQueryRepository.findCommentById(
      new ObjectId(req.params.id)
    );
    res.json(foundComment);
  }

  async updateComment(req: Request, res: Response) {
    const isUpdated = await this.commentsService.updateComment(
      new ObjectId(req.params.id),
      req.body
    );

    if (isUpdated) {
      const updatedComment = await this.commentsQueryRepository.findCommentById(
        req.body.id
      );
      res.status(204).json(updatedComment);
    }
  }

  async deleteComment(req: Request, res: Response) {
    const isDeleted = await this.commentsService.deleteComment(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }

  async deleteComments(req: Request, res: Response) {
    const isDeleted = await this.commentsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
}