import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { commentsQueryRepository } from "../repositories/query-repos/comments-query-repository";
import { commentsService } from "../domain/comments-service";

class CommentsController {
  async getComment(req: Request, res: Response) {
    const foundComment = await commentsQueryRepository.findCommentById(
      new ObjectId(req.params.id)
    );
    res.json(foundComment);
  }

  async updateComment(req: Request, res: Response) {
    const isUpdated = await commentsService.updateComment(
      new ObjectId(req.params.id),
      req.body
    );

    if (isUpdated) {
      const updatedComment = await commentsQueryRepository.findCommentById(
        req.body.id
      );
      res.status(204).json(updatedComment);
    }
  }

  async deleteComment(req: Request, res: Response) {
    const isDeleted = await commentsService.deleteComment(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }

  async deleteComments(req: Request, res: Response) {
    const isDeleted = await commentsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
}

export const commentsController = new CommentsController();