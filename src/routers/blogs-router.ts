import { Request, Response, Router } from "express";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";
import { randomNumber } from "../functions/random-num-generator";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogInputValidationMiddleware } from "../middlewares/blogs-input-validation-middleware";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { BlogViewModel } from "../models/BlogViewModel";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const foundBlogs: BlogViewModel[] =
    await blogsRepositoryMemory.findAllBlogs();
  res.json(foundBlogs);
  return;
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundBlog: BlogViewModel = await blogsRepositoryMemory.findBlogById(
    req.params.id
  );
  if (foundBlog) {
    res.json(foundBlog);
  } else {
    res.sendStatus(404);
  }
  return;
});

blogsRouter.post(
  "/",
  basicAuthMiddleware,
  blogInputValidationMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const newBlog: BlogViewModel = await blogsRepositoryMemory.createNewBlog(
      randomNumber(1, 999999999999999999999),
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(201).json(newBlog);
    return;
  }
);

blogsRouter.put(
  "/:id",
  basicAuthMiddleware,
  blogInputValidationMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const isUpdated: boolean = await blogsRepositoryMemory.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (isUpdated) {
      const updatedBlog: BlogViewModel =
        await blogsRepositoryMemory.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    } else {
      res.sendStatus(404);
    }
    return;
  }
);

blogsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted: boolean = await blogsRepositoryMemory.deleteBlog(
      req.params.id
    );
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
    return;
  }
);