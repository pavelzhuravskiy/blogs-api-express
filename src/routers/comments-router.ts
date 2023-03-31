import { Router } from "express";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationCommentsFindByParamId } from "../middlewares/validations/find-by-id/validation-comments-find-by-param-id";
import { ValidationCommentsInput } from "../middlewares/validations/input/validation-comments-input";
import { authBearer } from "../middlewares/auth/auth-bearer";
import { validationCommentOwner } from "../middlewares/validations/validation-comment-owner";
import { authBasic } from "../middlewares/auth/auth-basic";
import { commentsController } from "../controllers/CommentsController";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  validationCommentsFindByParamId,
  validationErrorCheck,
  commentsController.getComment
);

commentsRouter.put(
  "/:id",
  validationCommentsFindByParamId,
  authBearer,
  ValidationCommentsInput,
  validationErrorCheck,
  validationCommentOwner,
  commentsController.updateComment
);

commentsRouter.delete(
  "/:id",
  validationCommentsFindByParamId,
  validationErrorCheck,
  authBearer,
  validationCommentOwner,
  commentsController.deleteComment
);

commentsRouter.delete("/", authBasic, commentsController.deleteComments);