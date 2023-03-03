import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../models/global/GlobalRequestModel";
import { GlobalQueryModel } from "../models/global/GlobalQueryModel";
import { validationErrorCheck } from "../middlewares/global/validation-error-check";
import { usersQueryRepository } from "../repositories/users/mongodb-users-query-repository";
import { validationUsersInput } from "../middlewares/users/validation-users-input";
import { usersService } from "../domain/users-service";
import { validationUsersFindByParamId } from "../middlewares/users/validation-users-find-by-param-id";
import { validationUserUniqueLogin } from "../middlewares/users/validation-user-unique-login";
import { validationUserUniqueEmail } from "../middlewares/users/validation-user-unique-email";
import { authBasic } from "../middlewares/global/auth-basic";

export const usersRouter = Router({});

usersRouter.get(
  "/",
  async (req: RequestWithQuery<GlobalQueryModel>, res: Response) => {
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
  authBasic,
  validationUserUniqueLogin,
  validationUserUniqueEmail,
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