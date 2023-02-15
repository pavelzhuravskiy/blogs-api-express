import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/mongodb/blogs-repository-mongodb";
// import { blogsRepository } from "../repositories/memory/blogs-repository-memory";
import { randomNumber } from "../functions/random-num-generator";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogInputValidationMiddleware } from "../middlewares/blogs-input-validation-middleware";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const foundBlogs = await blogsRepository.findAllBlogs();
  res.json(foundBlogs);
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  const foundBlog = await blogsRepository.findBlogById(req.params.id);
  if (foundBlog) {
    res.json(foundBlog);
  } else {
    res.sendStatus(404);
  }
});

blogsRouter.post(
  "/",
  basicAuthMiddleware,
  blogInputValidationMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const newBlog = await blogsRepository.createNewBlog(
      randomNumber(1, 999999999999999999999),
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    res.status(201).json(newBlog);
  }
);

blogsRouter.put(
  "/:id",
  basicAuthMiddleware,
  blogInputValidationMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    const isUpdated = await blogsRepository.updateBlog(
      req.params.id,
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (isUpdated) {
      const updatedBlog = await blogsRepository.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsRepository.deleteBlog(req.params.id);
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);