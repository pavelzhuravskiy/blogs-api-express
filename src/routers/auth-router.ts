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
import { ObjectId } from "mongodb";
import { validationRefreshToken } from "../middlewares/validations/validation-refresh-token";
import { rateLimiter } from "../middlewares/rate-limiter";

export const authRouter = Router({});

authRouter.post(
  "/login",
  rateLimiter,
  validationAuthInput,
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
          // secure: true,
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
  rateLimiter,
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
  rateLimiter,
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
  rateLimiter,
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
  validationRefreshToken,
  async (req: Request, res: Response) => {
    const ip = req.ip;
    const cookieRefreshToken = req.cookies.refreshToken;

    const cookieRefreshTokenObj = await jwtService.verifyToken(
      cookieRefreshToken
    );

    const deviceId = cookieRefreshTokenObj!.deviceId;

    const userId = cookieRefreshTokenObj!.userId.toString();
    const user = await usersQueryRepository.findUserByIdWithMongoId(
      new ObjectId(userId)
    );

    const newAccessToken = await jwtService.createAccessTokenJWT(
      user,
      deviceId
    );
    const newRefreshToken = await jwtService.createRefreshTokenJWT(
      user,
      deviceId
    );
    const newRefreshTokenObj = await jwtService.verifyToken(newRefreshToken);
    const newIssuedAt = newRefreshTokenObj!.iat;

    await devicesService.updateDevice(ip, userId, newIssuedAt);

    res
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        // secure: true,
      })
      .status(200)
      .json(newAccessToken);
  }
);

authRouter.post("/logout", async (req: Request, res: Response) => {
  const cookieRefreshToken = req.cookies.refreshToken;
  const cookieRefreshTokenObj = await jwtService.verifyToken(
    cookieRefreshToken
  );
  if (cookieRefreshTokenObj) {
    const cookieDeviceId = cookieRefreshTokenObj.deviceId;
    await devicesService.deleteDevice(cookieDeviceId);
    res.sendStatus(204);
  } else {
    res.sendStatus(401);
  }
});