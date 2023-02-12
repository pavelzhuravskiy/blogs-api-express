import { body } from "express-validator";

export const postInputValidationMiddleware = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Type of title must be string")
    .bail()
    .trim()
    .isLength({
      min: 1,
      max: 30,
    })
    .withMessage(
      "Title length must be more than 0 and less than or equal to 30 symbols"
    ),
  body("shortDescription")
    .exists()
    .withMessage("Short description is required")
    .bail()
    .isString()
    .withMessage("Type of short description must be string")
    .bail()
    .trim()
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage(
      "Short description length must be more than 0 and less than or equal to 100 symbols"
    ),
  body("content")
    .exists()
    .withMessage("Content is required")
    .bail()
    .isString()
    .withMessage("Type of content must be string")
    .bail()
    .trim()
    .isLength({
      min: 1,
      max: 1000,
    })
    .withMessage(
      "Short description length must be more than 0 and less than or equal to 1000 symbols"
    ),
  body("content")
    .exists()
    .withMessage("Blog ID is required")
    .bail()
    .isString()
    .withMessage("Type of Blog ID must be string"),
];