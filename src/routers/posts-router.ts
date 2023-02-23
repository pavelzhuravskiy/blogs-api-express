import { Request, Response, Router } from "express";
import { postsService } from "../domain/posts-service";
import { authBasic } from "../middlewares/auth-basic";
import { validationPostsInput } from "../middlewares/validation-posts-input";
import { validationErrorCheck } from "../middlewares/validation-error-check";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../models/global/GlobalRequestModel";
import { MongoPostQueryModel } from "../models/mongodb/MongoPostQueryModel";
import { validationPostsCreation } from "../middlewares/validation-posts-creation";
import { validationPostsFindById } from "../middlewares/validation-posts-findbyid";

export const postsRouter = Router({});

postsRouter.get(
  "/",
  async (req: RequestWithQuery<MongoPostQueryModel>, res: Response) => {
    const foundPosts = await postsService.findPosts(req.query);
    res.json(foundPosts);
  }
);

postsRouter.get(
  "/:id",
  validationPostsFindById,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundPost = await postsService.findPostById(
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
    if (newPost) {
      res.status(201).json(newPost);
    } else {
      res.sendStatus(400);
    }
  }
);

postsRouter.put(
  "/:id",
  // basicAuthMiddleware,
  // postInputValidationMiddleware,
  // blogIdCheckMiddleware,
  // errorCheckMiddleware,
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
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/:id",
  // basicAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const isDeleted = await postsService.deletePost(
        new ObjectId(req.params.id)
      );
      if (isDeleted) {
        res.sendStatus(204);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

postsRouter.delete(
  "/",
  // basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await postsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);