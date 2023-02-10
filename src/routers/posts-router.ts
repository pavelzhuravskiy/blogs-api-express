import { Request, Response, Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { randomNumber } from "../functions/random-num-generator";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import {
  postBodyBlogIdValidationMiddleware,
  postBodyContentValidationMiddleware,
  postBodyDescriptionValidationMiddleware,
  postBodyNameValidationMiddleware,
} from "../middlewares/posts-body-validation-middleware";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogIdCheckMiddleware } from "../middlewares/blog-id-check-middleware";

export const postsRouter = Router({});

postsRouter.get("/", (req: Request, res: Response) => {
  res.json(postsRepository.findAllPosts());
});

postsRouter.get("/:id", (req: Request, res: Response) => {
  const foundPost = postsRepository.findPostById(req.params.id);
  if (foundPost) {
    res.json(foundPost);
  } else {
    res.sendStatus(404);
  }
  return;
});

postsRouter.post(
  "/",
  basicAuthMiddleware,
  blogIdCheckMiddleware,
  postBodyNameValidationMiddleware,
  postBodyDescriptionValidationMiddleware,
  postBodyContentValidationMiddleware,
  postBodyBlogIdValidationMiddleware,
  errorCheckMiddleware,
  (req: Request, res: Response) => {
    const newPost = postsRepository.createNewPost(
      randomNumber(1, 999999999999999999999),
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      req.body.blogName
    );
    res.status(201).json(newPost);
    return;
  }
);

postsRouter.put(
  "/:id",
  basicAuthMiddleware,
  blogIdCheckMiddleware,
  postBodyNameValidationMiddleware,
  postBodyDescriptionValidationMiddleware,
  postBodyContentValidationMiddleware,
  postBodyBlogIdValidationMiddleware,
  errorCheckMiddleware,
  (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(
      req.body.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      req.body.blogName
    );
    if (isUpdated) {
      const updatedPost = postsRepository.findPostById(req.body.id);
      res.status(204).json(updatedPost);
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  (req: Request, res: Response) => {
    const deletedPost = postsRepository.deletePost(req.params.id);
    if (deletedPost) {
      res.sendStatus(204);
    }
    res.sendStatus(404);
  }
);