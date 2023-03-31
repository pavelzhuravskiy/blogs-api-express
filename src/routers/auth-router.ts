import { Router } from "express";
import { authBearer } from "../middlewares/auth/auth-bearer";
import { validationAuthInput } from "../middlewares/validations/input/validation-auth-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationUserUnique } from "../middlewares/validations/validation-user-unique";
import { validationUsersInput } from "../middlewares/validations/input/validation-users-input";
import { validationEmailConfirm } from "../middlewares/validations/validation-email-confirm";
import { validationCodeInput } from "../middlewares/validations/input/validation-code-input";
import { validationEmailResend } from "../middlewares/validations/validation-email-resend";
import { validationEmailInput } from "../middlewares/validations/input/validation-email-input";
import { validationRefreshToken } from "../middlewares/validations/validation-refresh-token";
import { rateLimiter } from "../middlewares/rate-limiter";
import { validationPasswordConfirm } from "../middlewares/validations/validation-password-confirm";
import { validationPasswordInput } from "../middlewares/validations/input/validation-password-input";
import { validationRecoveryCodeInput } from "../middlewares/validations/input/validation-recovery-code-input";
import { authController } from "../controllers/AuthController";

export const authRouter = Router({});

// +++++ Registration section start +++++

authRouter.post(
  "/registration",
  rateLimiter,
  validationUserUnique("login"),
  validationUserUnique("email"),
  validationUsersInput,
  validationErrorCheck,
  authController.registerUser
);

authRouter.post(
  "/registration-confirmation",
  rateLimiter,
  validationCodeInput,
  validationEmailConfirm,
  validationErrorCheck,
  authController.confirmRegistration
);

authRouter.post(
  "/registration-email-resending",
  rateLimiter,
  validationEmailInput,
  validationEmailResend,
  validationErrorCheck,
  authController.reconfirmRegistration
);

// ----- Registration section end -----

// +++++ Login, logout and tokens section start +++++

authRouter.post(
  "/login",
  rateLimiter,
  validationAuthInput,
  validationErrorCheck,
  authController.login
);

authRouter.post(
  "/refresh-token",
  validationRefreshToken,
  authController.refreshTokens
);

authRouter.post("/logout", authController.logout);

// ----- Login, logout and tokens section end -----

// +++++ Password recovery section start +++++

authRouter.post(
  "/password-recovery",
  rateLimiter,
  validationEmailInput,
  validationErrorCheck,
  authController.recoverPassword
);

authRouter.post(
  "/new-password",
  rateLimiter,
  validationRecoveryCodeInput,
  validationPasswordInput,
  validationPasswordConfirm,
  validationErrorCheck,
  authController.changePassword
);

// ----- Password recovery section end -----

// +++++ Account info section start +++++

authRouter.get("/me", authBearer, authController.getAccountInfo);

// ----- Account info section end -----