import { Request, Response, Router } from "express";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";
import {authBasic} from "../middlewares/auth-basic";
import {
    validationBlogsInput
} from "../middlewares/validation-blogs-input";
import {validationErrorCheck} from "../middlewares/validation-error-check";

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
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
});

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

blogsRouter.put(
  "/:id",
  // basicAuthMiddleware,
  // blogInputValidationMiddleware,
  // errorCheckMiddleware,
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
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(404);
    }
  }
);

blogsRouter.delete(
  "/:id",
  // basicAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const isDeleted = await blogsService.deleteBlog(
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

blogsRouter.delete(
  "/",
  // basicAuthMiddleware,
  async (req: Request, res: Response) => {
    const isDeleted = await blogsService.deleteAll();
    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);