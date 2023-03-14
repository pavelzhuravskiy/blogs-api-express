"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationCommentsInput = void 0;
const express_validator_1 = require("express-validator");
exports.ValidationCommentsInput = [
    (0, express_validator_1.body)("content")
        .exists()
        .withMessage("Content is required")
        .isString()
        .withMessage("Type of content must be string")
        .trim()
        .isLength({
        min: 20,
        max: 300,
    })
        .withMessage("Content length must be 20-300 symbols"),
];
