import { Request, Response, Router } from "express";
import { postsRepository } from "../repositories/mongodb/posts-repository-mongodb";
// import { postsRepository } from "../repositories/memory/posts-repository-memory";
import { randomNumber } from "../functions/random-num-generator";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { postInputValidationMiddleware } from "../middlewares/posts-input-validation-middleware";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogIdCheckMiddleware } from "../middlewares/blog-id-check-middleware";
import { blogNameFinder } from "../functions/blog-name-finder";

export const postsRouter = Router({});

postsRouter.get("/", async (req: Request, res: Response) => {
  const foundPosts = await postsRepository.findAllPosts();
  res.json(foundPosts);
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundPost = await postsRepository.findPostById(req.params.id);
  if (foundPost) {
    res.json(foundPost);
  } else {
    res.sendStatus(404);
  }
});

postsRouter.post(
  "/",
  basicAuthMiddleware,
  postInputValidationMiddleware,
  blogIdCheckMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const newPost = await postsRepository.createNewPost(
      randomNumber(1, 999999999999999999999),
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      await blogNameFinder(req)
    );
    res.status(201).json(newPost);
  }
);

postsRouter.put(
  "/:id",
  basicAuthMiddleware,
  postInputValidationMiddleware,
  blogIdCheckMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const isUpdated = await postsRepository.updatePost(
      req.params.id,
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      await blogNameFinder(req)
    );
    if (isUpdated) {
      const updatedPost = await postsRepository.findPostById(req.body.id);
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
    const deletedPost = await postsRepository.deletePost(req.params.id);
    if (deletedPost) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);