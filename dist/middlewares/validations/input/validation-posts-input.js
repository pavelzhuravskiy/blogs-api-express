"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationPostsInput = void 0;
const express_validator_1 = require("express-validator");
exports.validationPostsInput = [
    (0, express_validator_1.body)("title")
        .exists()
        .withMessage("Title is required")
        .isString()
        .withMessage("Type of title must be string")
        .trim()
        .isLength({
        min: 1,
        max: 30,
    })
        .withMessage("Title length must be more than 0 and less than or equal to 30 symbols"),
    (0, express_validator_1.body)("shortDescription")
        .exists()
        .withMessage("Short description is required")
        .isString()
        .withMessage("Type of short description must be string")
        .trim()
        .isLength({
        min: 1,
        max: 100,
    })
        .withMessage("Short description length must be more than 0 and less than or equal to 100 symbols"),
    (0, express_validator_1.body)("content")
        .exists()
        .withMessage("Content is required")
        .isString()
        .withMessage("Type of content must be string")
        .trim()
        .isLength({
        min: 1,
        max: 1000,
    })
        .withMessage("Short description length must be more than 0 and less than or equal to 1000 symbols"),
    (0, express_validator_1.body)("content")
        .exists()
        .withMessage("Blog ID is required")
        .isString()
        .withMessage("Type of Blog ID must be string"),
];
