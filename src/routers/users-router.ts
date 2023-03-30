import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../types/request-types";
import { GlobalQueryModel } from "../models/global/GlobalQueryModel";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { usersQueryRepository } from "../repositories/query-repos/users-query-repository";
import { validationUsersInput } from "../middlewares/validations/input/validation-users-input";
import { usersService } from "../domain/users-service";
import { validationUsersFindByParamId } from "../middlewares/validations/find-by-id/validation-users-find-by-param-id";
import { validationUserUnique } from "../middlewares/validations/validation-user-unique";
import { authBasic } from "../middlewares/auth/auth-basic";
import {SortOrder} from "mongoose";

export const usersRouter = Router({});

usersRouter.get(
  "/",
  authBasic,
  async (req: RequestWithQuery<GlobalQueryModel>, res: Response) => {
    const foundBlogs = await usersQueryRepository.findUsers(
        Number(req.query.pageNumber) || 1,
        Number(req.query.pageSize) || 10,
        req.query.sortBy,
        req.query.sortDirection as SortOrder,
        req.query.searchLoginTerm,
        req.query.searchEmailTerm,
    );
    res.json(foundBlogs);
  }
);

usersRouter.post(
  "/",
  authBasic,
  validationUserUnique("login"),
  validationUserUnique("email"),
  validationUsersInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const newUser = await usersService.createNewUser(
      req.body.login,
      req.body.password,
      req.body.email
    );
    res.status(201).json(newUser);
  }
);

usersRouter.delete(
  "/:id",
  authBasic,
  validationUsersFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const isDeleted = await usersService.deleteUser(
      new ObjectId(req.params.id)
    );
    if (isDeleted) {
      res.sendStatus(204);
    }
  }
);

usersRouter.delete("/", authBasic, async (req: Request, res: Response) => {
  const isDeleted = await usersService.deleteAll();
  if (isDeleted) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});