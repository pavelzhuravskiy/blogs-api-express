import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import { randomNumber } from "../functions/random-num-generator";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import {
  blogBodyDescriptionValidationMiddleware,
  blogBodyNameValidationMiddleware,
  blogBodyWebsiteUrlValidationMiddleware,
} from "../middlewares/blogs-body-validation-middleware";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";

export const blogsRouter = Router({});

blogsRouter.get("/", (req: Request, res: Response) => {
  res.json(blogsRepository.findAllBlogs());
});

blogsRouter.get("/:id", (req: Request, res: Response) => {
  const foundBlog = blogsRepository.findBlogById(req.params.id);
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
  blogBodyNameValidationMiddleware,
  blogBodyDescriptionValidationMiddleware,
  blogBodyWebsiteUrlValidationMiddleware,
  errorCheckMiddleware,
  (req: Request, res: Response) => {
    const newBlog = blogsRepository.createNewBlog(
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
  blogBodyNameValidationMiddleware,
  blogBodyDescriptionValidationMiddleware,
  blogBodyWebsiteUrlValidationMiddleware,
  errorCheckMiddleware,
  (req: Request, res: Response) => {
    const isUpdated = blogsRepository.updateBlog(
      req.body.name,
      req.body.description,
      req.body.websiteUrl
    );
    if (isUpdated) {
      const updatedBlog = blogsRepository.findBlogById(req.body.id);
      res.status(204).json(updatedBlog);
    } else {
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  (req: Request, res: Response) => {
    const deletedBlog = blogsRepository.deleteBlog(req.params.id);
    if (deletedBlog) {
      res.sendStatus(204);
    }
    res.sendStatus(404);
  }
);