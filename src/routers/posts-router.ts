import { Request, Response, Router } from "express";
import { postsRepositoryMemory } from "../repositories/memory/posts-repository-memory";
import { randomNumber } from "../functions/random-num-generator";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { postInputValidationMiddleware } from "../middlewares/posts-input-validation-middleware";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogIdCheckMiddleware } from "../middlewares/blog-id-check-middleware";
import { blogNameFinder } from "../functions/blog-name-finder";
import { PostViewModel } from "../models/PostViewModel";

export const postsRouter = Router({});

postsRouter.get("/", async (req: Request, res: Response) => {
  const foundPosts: PostViewModel[] =
    await postsRepositoryMemory.findAllPosts();
  res.json(foundPosts);
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundPost: PostViewModel = await postsRepositoryMemory.findPostById(
    req.params.id
  );
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
  postInputValidationMiddleware,
  blogIdCheckMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const newPost: PostViewModel = await postsRepositoryMemory.createNewPost(
      randomNumber(1, 999999999999999999999),
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      blogNameFinder(req)
    );
    res.status(201).json(newPost);
    return;
  }
);

postsRouter.put(
  "/:id",
  basicAuthMiddleware,
  postInputValidationMiddleware,
  blogIdCheckMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const isUpdated: boolean = await postsRepositoryMemory.updatePost(
      req.params.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      blogNameFinder(req)
    );
    if (isUpdated) {
      const updatedPost: PostViewModel =
        await postsRepositoryMemory.findPostById(req.body.id);
      res.status(204).json(updatedPost);
    } else {
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const deletedPost: boolean = await postsRepositoryMemory.deletePost(
      req.params.id
    );
    if (deletedPost) {
      res.sendStatus(204);
    }
    res.sendStatus(404);
  }
);