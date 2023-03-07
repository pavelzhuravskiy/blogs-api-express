import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import { authBasic } from "../middlewares/global/auth-basic";
import { validationPostsInput } from "../middlewares/posts/validation-posts-input";
import { validationErrorCheck } from "../middlewares/global/validation-error-check";
import { ObjectId } from "mongodb";
import {
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "../models/global/GlobalRequestModel";
import { validationPostsCreation } from "../middlewares/posts/validation-posts-creation";
import { validationPostsFindByParamId } from "../middlewares/posts/validation-posts-find-by-param-id";
import { postsQueryRepository } from "../repositories/posts/mongodb-posts-query-repository";
import { GlobalQueryModel } from "../models/global/GlobalQueryModel";
import { ValidationCommentsInput } from "../middlewares/posts/validation-comments-input";
import { GlobalIdStringModel } from "../models/global/GlobalIdStringModel";

export const postsRouter = Router({});

postsRouter.get(
  "/",
  async (req: RequestWithQuery<GlobalQueryModel>, res: Response) => {
    const foundPosts = await postsQueryRepository.findPosts(
      null,
      null,
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
    req: Request &
      RequestWithParamsAndQuery<GlobalIdStringModel, GlobalQueryModel>,
    res: Response
  ) => {
    const foundComments = await postsQueryRepository.findComments(
      new ObjectId(req.params.id),
      null,
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize
    );
    res.json(foundComments);
  }
);

postsRouter.post(
  "/:id/comments",
  // authBasic,
  validationPostsFindByParamId,
  ValidationCommentsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newComment = await postsService.createNewCommentByPostId(
      new ObjectId(req.params.id),
      req.body
    );
    res.status(201).json(newComment);
  }
);

// Comments section end

postsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
  const isDeleted = await postsService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});