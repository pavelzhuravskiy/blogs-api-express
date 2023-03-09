import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import { authBasic } from "../middlewares/auth/auth-basic";
import { validationPostsInput } from "../middlewares/validations/input/validation-posts-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../types/request-types";
import { validationPostsCreation } from "../middlewares/validations/validation-posts-creation";
import { validationPostsFindByParamId } from "../middlewares/validations/find-by-id/validation-posts-find-by-param-id";
import { postsQueryRepository } from "../repositories/query-repos/mongodb-posts-query-repository";
import { GlobalQueryModel } from "../models/global/GlobalQueryModel";
import { ValidationCommentsInput } from "../middlewares/validations/input/validation-comments-input";
import { commentsQueryRepository } from "../repositories/query-repos/mongodb-comments-query-repository";
import { commentsService } from "../domain/comments-service";
import { authBearer } from "../middlewares/auth/auth-bearer";
import {commentsRouter} from "./comments-router";
import {commentsRepository} from "../repositories/mongodb-comments-repository";

export const postsRouter = Router({});

postsRouter.get(
  "/",
  async (req: RequestWithQuery<GlobalQueryModel>, res: Response) => {
    const foundPosts = await postsQueryRepository.findPosts(
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize
    );
    res.json(foundPosts);
  }
);

postsRouter.get(
  "/:id",
  validationPostsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundPost = await postsQueryRepository.findPostById(
      new ObjectId(req.params.id)
    );
    res.json(foundPost);
  }
);

postsRouter.post(
  "/",
  authBasic,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newPost = await postsService.createNewPost(req.body);
    res.status(201).json(newPost);
  }
);

postsRouter.put(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isUpdated = await postsService.updatePost(
      new ObjectId(req.params.id),
      req.body
    );

    if (isUpdated) {
      const updatedPost = await postsQueryRepository.findPostById(req.body.id);
      res.status(204).json(updatedPost);
    }
  }
);

postsRouter.delete(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isDeleted = await postsService.deletePost(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }
);

// Comments section start

postsRouter.get(
  "/:id/comments",
  validationPostsFindByParamId,
  validationErrorCheck,
  async (
    req: RequestWithQuery<GlobalQueryModel>,
    res: Response
  ) => {
    const foundComments = await commentsQueryRepository.findComments(
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize,
    );
    res.json(foundComments);
  }
);

postsRouter.post(
  "/:id/comments",
  authBearer,
  validationPostsFindByParamId,
  ValidationCommentsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newComment = await commentsService.createNewCommentByPostId(
      new ObjectId(req.params.id),
      req.body,
      req.user!._id
    );
    res.status(201).json(newComment);
  }
);

commentsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
    const isDeleted = await commentsRepository.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// Comments section end

postsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
  const isDeleted = await postsService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});