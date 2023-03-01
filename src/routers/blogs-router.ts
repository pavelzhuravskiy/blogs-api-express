import { Request, Response, Router } from "express";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";
import {
  RequestWithParamsAndQuery,
  RequestWithQuery,
} from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/blogs/MongoBlogQueryModel";
import { authBasic } from "../middlewares/global/auth-basic";
import { validationBlogsInput } from "../middlewares/blogs/validation-blogs-input";
import { validationErrorCheck } from "../middlewares/global/validation-error-check";
import { validationBlogsFindByParamId } from "../middlewares/blogs/validation-blogs-find-by-param-id";
import { postsService } from "../domain/posts-service";
import { validationPostsInput } from "../middlewares/posts/validation-posts-input";
import { MongoPostQueryModel } from "../models/posts/MongoPostQueryModel";
import { GlobalIdStringModel } from "../models/global/GlobalIdStringModel";
import { blogsQueryRepository } from "../repositories/blogs/mongodb-blogs-query-repository";
import { postsQueryRepository } from "../repositories/posts/mongodb-posts-query-repository";

export const blogsRouter = Router({});

blogsRouter.get(
  "/",
  async (req: RequestWithQuery<MongoBlogQueryModel>, res: Response) => {
    const foundBlogs = await blogsQueryRepository.findBlogs(
      req.query.searchNameTerm,
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize
    );
    res.json(foundBlogs);
  }
);

blogsRouter.get(
  "/:id",
  validationBlogsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundBlog = await blogsQueryRepository.findBlogById(
      new ObjectId(req.params.id)
    );
    res.json(foundBlog);
  }
);

blogsRouter.get(
  "/:id/posts",
  validationBlogsFindByParamId,
  validationErrorCheck,
  async (
    req: Request &
      RequestWithParamsAndQuery<GlobalIdStringModel, MongoPostQueryModel>,
    res: Response
  ) => {
    const foundPosts = await postsQueryRepository.findPosts(
      new ObjectId(req.params.id),
      null,
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize
    );
    res.json(foundPosts);
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
  validationBlogsFindByParamId,
  validationPostsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newBlog = await postsService.createNewPostByBlogId(
      new ObjectId(req.params.id),
      req.body
    );
    res.status(201).json(newBlog);
  }
);

blogsRouter.put(
  "/:id",
  authBasic,
  validationBlogsFindByParamId,
  validationBlogsInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isUpdated = await blogsService.updateBlog(
      new ObjectId(req.params.id),
      req.body
    );
    if (isUpdated) {
      const updatedBlog = await blogsQueryRepository.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    }
  }
);

blogsRouter.delete(
  "/:id",
  authBasic,
  validationBlogsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteBlog(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }
);

blogsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
  const isDeleted = await blogsService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});