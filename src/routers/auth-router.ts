import { Request, Response, Router } from "express";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { usersService } from "../domain/users-service";
import { validationAuthInput } from "../middlewares/validations/input/validation-auth-input";
import { jwtService } from "../application/jwt-service";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";

export const authRouter = Router({});
authRouter.post(
  "/login",
  validationAuthInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const check = await usersService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password
    );
    if (check) {
      const user = await usersQueryRepository.findUserByLoginOrEmail(
        req.body.loginOrEmail
      );

      const token = await jwtService.createJWT(user);
      res.status(200).json(token);
    } else {
      res.sendStatus(401);
    }
  }
);