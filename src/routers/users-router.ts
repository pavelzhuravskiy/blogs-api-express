import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import {
  RequestWithQuery,
} from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/blogs/MongoBlogQueryModel";
import { validationErrorCheck } from "../middlewares/global/validation-error-check";
import { usersQueryRepository } from "../repositories/users/mongodb-users-query-repository";
import { validationUsersInput } from "../middlewares/users/validation-users-input";
import { usersService } from "../domain/users-service";
import { validationUsersFindByParamId } from "../middlewares/users/validation-users-find-by-param-id";

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

usersRouter.get(
  "/:id",
  validationUsersFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundUser = await usersQueryRepository.findUserById(
      new ObjectId(req.params.id)
    );
    res.json(foundUser);
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

usersRouter.delete(
  "/:id",
  // authBasic,
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