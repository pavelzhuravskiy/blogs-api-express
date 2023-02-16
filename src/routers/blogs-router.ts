import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/mongodb/blogs-repository-mongodb";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogInputValidationMiddleware } from "../middlewares/blogs-input-validation-middleware";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { blogMapping } from "../functions/blog-mapping";
import { ObjectId } from "mongodb";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const foundBlogs = await blogsRepository.findAllBlogs();
  res.json(blogMapping(foundBlogs));
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const foundBlog = await blogsRepository.findBlogById(
      new ObjectId(req.params.id)
    );
    if (foundBlog) {
      res.json(foundBlog);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
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
      req.body.name,
      req.body.description,
      req.body.websiteUrl,
      new Date().toISOString(),
      false
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
  basicAuthMiddleware,
  blogInputValidationMiddleware,
  errorCheckMiddleware,
  async (req: Request, res: Response) => {
    try {
      const isUpdated = await blogsRepository.updateBlog(
        new ObjectId(req.params.id),
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
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
      try {
          const isDeleted = await blogsRepository.deleteBlog(new ObjectId(req.params.id));
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

blogsRouter.delete(
  "/",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsRepository.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);