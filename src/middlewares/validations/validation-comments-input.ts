import { body } from "express-validator";

export const ValidationCommentsInput = [
  body("content")
    .exists()
    .withMessage("Content is required")
    .bail()
    .isString()
    .withMessage("Type of content must be string")
    .bail()
    .trim()
    .isLength({
      min: 20,
      max: 300,
    })
    .withMessage("Content length must be 20-300 symbols"),
];