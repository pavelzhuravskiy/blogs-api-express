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
import { devicesService } from "../domain/devices-service";

export const authRouter = Router({});

authRouter.post(
  "/login",
  validationAuthInput, // TODO 429 status
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const check = await usersService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password
    );
    if (check) {
      const ip = req.ip;
      const userAgent = req.headers["user-agent"] || "unknown";
      const user = await usersQueryRepository.findUserByLoginOrEmail(
        req.body.loginOrEmail
      );
      const newAccessToken = await jwtService.createAccessTokenJWT(user);
      const newRefreshToken = await jwtService.createRefreshTokenJWT(user);
      await devicesService.createDevice(newRefreshToken, ip, userAgent);
      res
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          // secure: true, // TODO Fix
        })
        .status(200)
        .json(newAccessToken);
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

authRouter.post(
  "/refresh-token",
  // validationRefreshToken,
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    const userId = await jwtService.getUserIdFromToken(refreshToken);
    if (userId) {
      const user = await usersQueryRepository.findUserByIdWithMongoId(userId);
      const newAccessToken = await jwtService.createAccessTokenJWT(user);
      const newRefreshToken = await jwtService.createRefreshTokenJWT(user);

      const issuedAt = await jwtService.getIssuedAtFromToken(refreshToken);

      if (issuedAt) {
        res
          .cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            // secure: true, // TODO Fix
          })
          .status(200)
          .json(newAccessToken);
      }
    } else {
      res.sendStatus(401);
    }
  }
);

// authRouter.post(
//     "/login",
//     validationAuthInput, // TODO 429 status
//     validationErrorCheck,
//     async (req: Request, res: Response) => {
//         const check = await usersService.checkCredentials(
//             req.body.loginOrEmail,
//             req.body.password
//         );
//         if (check) {
//             const refreshToken = req.cookies.refreshToken;
//             const ip = req.ip;
//             const user = await usersQueryRepository.findUserByLoginOrEmail(
//                 req.body.loginOrEmail
//             );
//
//             const deviceId = await jwtService.getDeviceIdFromToken(refreshToken);
//             const newAccessToken = await jwtService.createAccessTokenJWT(user);
//             const newRefreshToken = await jwtService.createRefreshTokenJWT(user);
//             const issuedAt = await jwtService.getIssuedAtFromToken(newRefreshToken);
//
//             if (deviceId && issuedAt) {
//                 await devicesService.updateDevice(deviceId, issuedAt, ip);
//             } else {
//                 let userAgent = req.headers["user-agent"];
//                 if (!userAgent) {
//                     userAgent = "unknown";
//                 }
//                 await devicesService.createDevice(newRefreshToken, ip, userAgent);
//             }
//
//             res
//                 .cookie("refreshToken", newRefreshToken, {
//                     httpOnly: true,
//                     // secure: true, // TODO Fix
//                 })
//                 .status(200)
//                 .json(newAccessToken);
//         } else {
//             res.sendStatus(401);
//         }
//     }
// );

authRouter.post(
  "/logout",
  // validationRefreshToken,
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const userId = await jwtService.getUserIdFromToken(refreshToken);
    if (userId) {
      // await tokensService.createNewBlacklistedRefreshToken(refreshToken);
      res.sendStatus(204);
    } else {
      res.sendStatus(401);
    }
  }
);