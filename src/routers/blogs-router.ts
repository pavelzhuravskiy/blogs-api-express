import { Request, Response, Router } from "express";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";
import {
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";
import { authBasic } from "../middlewares/auth-basic";
import { validationBlogsInput } from "../middlewares/validation-blogs-input";
import { validationErrorCheck } from "../middlewares/validation-error-check";
import { validationBlogsFindById } from "../middlewares/validation-blogs-findbyid";
import { postsService } from "../domain/posts-service";
import { validationPostsInput } from "../middlewares/validation-posts-input";
import { MongoPostQueryModel } from "../models/mongodb/MongoPostQueryModel";
import { GlobalIdStringModel } from "../models/global/GlobalIdStringModel";

export const blogsRouter = Router({});

blogsRouter.get(
  "/",
  async (req: RequestWithQuery<MongoBlogQueryModel>, res: Response) => {
    const foundBlogs = await blogsService.findBlogs(req.query);
    res.json(foundBlogs);
  }
);

blogsRouter.get(
  "/:id",
  validationBlogsFindById,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundBlog = await blogsService.findBlogById(
      new ObjectId(req.params.id)
    );
    if (foundBlog) {
      res.json(foundBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.get(
  "/:id/posts",
  validationBlogsFindById,
  validationErrorCheck,
  async (
    req: Request &
      RequestWithParamsAndQuery<GlobalIdStringModel, MongoPostQueryModel>,
    res: Response
  ) => {
    const foundPosts = await postsService.findPostsByBlogId(
      new ObjectId(req.params.id),
      req.query
    );
    if (foundPosts) {
      res.json(foundPosts);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.post(
  "/",
  authBasic,
  validationBlogsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newBlog = await blogsService.createNewBlog(req.body);
    res.status(201).json(newBlog);
  }
);

blogsRouter.post(
  "/:id/posts",
  authBasic,
  validationBlogsFindById,
  validationPostsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newBlog = await postsService.createNewPostByBlogId(
      new ObjectId(req.params.id),
      req.body
    );
    if (newBlog) {
      res.status(201).json(newBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.put(
  "/:id",
  authBasic,
  validationBlogsFindById,
  validationBlogsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isUpdated = await blogsService.updateBlog(
      new ObjectId(req.params.id),
      req.body
    );
    if (isUpdated) {
      const updatedBlog = await blogsService.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  authBasic,
  validationBlogsFindById,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteBlog(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
  const isDeleted = await blogsService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  }
});