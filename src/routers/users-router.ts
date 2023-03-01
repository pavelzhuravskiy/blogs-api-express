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
import { usersQueryRepository } from "../repositories/users/mongodb-users-query-repository";
import { validationUsersInput } from "../middlewares/users/validation-users-input";
import {usersService} from "../domain/users-service";

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

usersRouter.post(
  "/",
  // authBasic,
  validationUsersInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newUser = await usersService.createNewUser(req.body);
    res.status(201).json(newUser);
  }
);
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