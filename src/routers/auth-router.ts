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
import { validationEmailConfirm } from "../middlewares/validations/validation-email-confirm";
import { validationCodeInput } from "../middlewares/validations/input/validation-code-input";
import { validationEmailResend } from "../middlewares/validations/validation-email-resend";
import { validationEmailResendInput } from "../middlewares/validations/input/validation-email-resend-input";

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

      const accessToken = await jwtService.createAccessTokenJWT(user);
      const refreshToken = await jwtService.createRefreshTokenJWT(user);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          // secure: true, // TODO Set true!
        })
        .status(200)
        .json(accessToken);
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
    await authService.registerUser(
      req.body.login,
      req.body.password,
      req.body.email
    );
    res.sendStatus(204);
  }
);

authRouter.post(
  "/registration-confirmation",
  validationCodeInput,
  validationEmailConfirm,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    await authService.confirmEmail(req.body.code);
    res.sendStatus(204);
  }
);

authRouter.post(
  "/registration-email-resending",
  validationEmailResendInput,
  validationEmailResend,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    await authService.resendEmail(req.body.email);
    res.sendStatus(204);
  }
);

// authRouter.post(
//     "/refresh-token",
//     // validationTokenInput, // TODO Middleware
//     // validationErrorCheck,
//     async (req: Request, res: Response) => {
//         const check = await usersService.checkToken(
//             req.cookies.refreshToken
//         );
//         if (check) {
//             const user = await usersQueryRepository.findUserByLoginOrEmail(
//                 req.body.loginOrEmail
//             );
//
//             const accessToken = await jwtService.createAccessTokenJWT(user);
//             const refreshToken = await jwtService.createRefreshTokenJWT(user);
//             res
//                 .cookie("refreshToken", refreshToken, {
//                     httpOnly: true,
//                     // secure: true, // TODO Set true!
//                 })
//                 .status(200)
//                 .json(accessToken);
//         } else {
//             res.sendStatus(401);
//         }
//     }
// );