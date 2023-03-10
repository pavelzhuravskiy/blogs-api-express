import {Request, Response, Router} from "express";
import {
    validationErrorCheck
} from "../middlewares/validations/_validation-error-check";
import {ObjectId} from "mongodb";
import {
    validationCommentsFindByParamId
} from "../middlewares/validations/find-by-id/validation-comments-find-by-param-id";
import {
    commentsQueryRepository
} from "../repositories/query-repos/mongodb-comments-query-repository";
import {commentsService} from "../domain/comments-service";
import {
    ValidationCommentsInput
} from "../middlewares/validations/input/validation-comments-input";
import {authBearer} from "../middlewares/auth/auth-bearer";
import {
    validationUserCorrect
} from "../middlewares/validations/validation-user-correct";
import {authBasic} from "../middlewares/auth/auth-basic";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  validationCommentsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundComment = await commentsQueryRepository.findCommentById(
      new ObjectId(req.params.id)
    );
    res.json(foundComment);
  }
);

commentsRouter.put(
  "/:id",
  validationCommentsFindByParamId,
  ValidationCommentsInput,
  validationErrorCheck,
  authBearer,
  validationUserCorrect,
  async (req: Request, res: Response) => {
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
);

commentsRouter.delete(
  "/:id",
  validationCommentsFindByParamId,
  validationErrorCheck,
  authBearer,
  validationUserCorrect,
  async (req: Request, res: Response) => {
    const isDeleted = await commentsService.deleteComment(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }
);

commentsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
    const isDeleted = await commentsService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});