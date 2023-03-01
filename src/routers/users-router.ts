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
import { validationBlogsFindByParamId } from "../middlewares/validation-blogs-find-by-param-id";
import { postsService } from "../domain/posts-service";
import { validationPostsInput } from "../middlewares/validation-posts-input";
import { MongoPostQueryModel } from "../models/mongodb/MongoPostQueryModel";
import { GlobalIdStringModel } from "../models/global/GlobalIdStringModel";
import { blogsQueryRepository } from "../repositories/mongodb/mongodb-blogs-query-repository";
import { postsQueryRepository } from "../repositories/mongodb/mongodb-posts-query-repository";
import { usersQueryRepository } from "../repositories/mongodb/mongodb-users-query-repository";

export const usersRouter = Router({});

usersRouter.get(
  "/",
  async (req: RequestWithQuery<MongoBlogQueryModel>, res: Response) => {
    const foundBlogs = await usersQueryRepository.findUsers(
      req.query.searchLoginTerm,
      req.query.searchEmailTerm,
      req.query.sortBy,
      req.query.sortDirection,
      req.query.pageNumber,
      req.query.pageSize
    );
    res.json(foundBlogs);
  }
);

// blogsRouter.post(
//   "/",
//   authBasic,
//   validationBlogsInput,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const newBlog = await blogsService.createNewBlog(req.body);
//     res.status(201).json(newBlog);
//   }
// );
//
// blogsRouter.delete(
//   "/:id",
//   authBasic,
//   validationBlogsFindByParamId,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const isDeleted = await blogsService.deleteBlog(
//       new ObjectId(req.params.id)
//     );
//     if (isDeleted) {
//       res.sendStatus(204);
//     }
//   }
// );