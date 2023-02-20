import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { postInputValidationMiddleware } from "../middlewares/posts-input-validation-middleware";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogNameFinder } from "../functions/blog-name-finder";
import { postMapping } from "../functions/post-mapping";
import { ObjectId } from "mongodb";
import { blogIdCheckMiddleware } from "../middlewares/blog-id-check-middleware";

export const postsRouter = Router({});

postsRouter.get("/", async (req: Request, res: Response) => {
  const foundPosts = await postsService.findAllPosts();
  res.json(postMapping(foundPosts));
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const foundPost = await postsService.findPostById(
      new ObjectId(req.params.id)
    );
    if (foundPost) {
      res.json(foundPost);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
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
    const newPost = await postsService.createNewPost(
      req.body.title,
      req.body.shortDescription,
      req.body.content,
      req.body.blogId,
      await blogNameFinder(req),
      new Date().toISOString()
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
    try {
      const isUpdated = await postsService.updatePost(
        new ObjectId(req.params.id),
        req.body.title,
        req.body.shortDescription,
        req.body.content,
        req.body.blogId
      );
      if (isUpdated) {
        const updatedPost = await postsService.findPostById(req.body.id);
        res.status(204).json(updatedPost);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const isDeleted = await postsService.deletePost(
        new ObjectId(req.params.id)
      );
      if (isDeleted) {
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await postsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);