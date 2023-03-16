import { cookie } from "express-validator";

export const validationTokenInput = [
  cookie("refreshToken")
    .exists()
    .withMessage("Refresh token is required")
    .isString()
    .withMessage("Type of refresh token must be string"),
];