import { Request, Response, Router } from "express";
import { usersService } from "../domain/users-service";
import { jwtService } from "../application/jwt-service";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";
import { authBearer } from "../middlewares/auth/auth-bearer";
import { validationAuthInput } from "../middlewares/validations/input/validation-auth-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationUserUnique } from "../middlewares/validations/validation-user-unique";
import { validationUsersInput } from "../middlewares/validations/input/validation-users-input";
import { authService } from "../domain/auth-service";

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

authRouter.get("/me", authBearer, async (req: Request, res: Response) => {
  const accountInfo = {
    email: req.user!.accountData.email,
    login: req.user!.accountData.login,
    userId: req.user!._id,
  };
  res.status(200).json(accountInfo);
});

authRouter.post(
  "/registration",
  validationUserUnique("login"),
  validationUserUnique("email"),
  validationUsersInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const user = await authService.registerUser(
      req.body.login,
      req.body.password,
      req.body.email
    );
    if (user) {
      res.sendStatus(204);
    } else {
      res.sendStatus(400);
    }
  }
);