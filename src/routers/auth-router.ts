import { Request, Response, Router } from "express";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { usersService } from "../domain/users-service";
import { validationAuthInput } from "../middlewares/validations/input/validation-auth-input";

export const authRouter = Router({});
authRouter.post(
  "/login",
  validationAuthInput,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const checkAuth = await usersService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password
    );
    if (checkAuth) {
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  }
);