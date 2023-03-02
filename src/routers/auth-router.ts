import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import { RequestWithQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/blogs/MongoBlogQueryModel";
import { validationErrorCheck } from "../middlewares/global/validation-error-check";
import { usersQueryRepository } from "../repositories/users/mongodb-users-query-repository";
import { validationUsersInput } from "../middlewares/users/validation-users-input";
import { usersService } from "../domain/users-service";
import { validationUsersFindByParamId } from "../middlewares/users/validation-users-find-by-param-id";

export const authRouter = Router({});
//
authRouter.post(
  "/login",
  // authBasic,
  // validationUsersInput,
  // validationErrorCheck,

  async (req: Request, res: Response) => {
    const checkAuth = await usersService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password
    );
    if (checkAuth) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  }
);