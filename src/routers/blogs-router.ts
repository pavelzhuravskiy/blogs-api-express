import { Request, Response, Router } from "express";
import { blogsService } from "../domain/blogs-service";
import { errorCheckMiddleware } from "../middlewares/error-check-middleware";
import { blogInputValidationMiddleware } from "../middlewares/blogs-input-validation-middleware";
import { basicAuthMiddleware } from "../middlewares/basic-auth-middleware";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";

export const blogsRouter = Router({});

blogsRouter.get(
  "/",
  async (req: RequestWithQuery<MongoBlogQueryModel>, res: Response) => {
    const foundBlogs = await blogsService.findBlogs(req.query);
    res.json(foundBlogs);
  }
);

blogsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const foundBlog = await blogsService.findBlogById(
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
    const newBlog = await blogsService.createNewBlog(
     req.body
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
    try {
      const isUpdated = await blogsService.updateBlog(
        new ObjectId(req.params.id),
        req.body.name,
        req.body.description,
        req.body.websiteUrl
      );
      if (isUpdated) {
        const updatedBlog = await blogsService.findBlogById(req.body.id);
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
      const isDeleted = await blogsService.deleteBlog(
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

blogsRouter.delete(
  "/",
  basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);