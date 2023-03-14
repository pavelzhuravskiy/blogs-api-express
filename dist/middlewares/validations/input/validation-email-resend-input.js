"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationEmailResendInput = void 0;
const express_validator_1 = require("express-validator");
const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
exports.validationEmailResendInput = [
    (0, express_validator_1.body)("email")
        .exists()
        .withMessage("E-mail is required")
        .isString()
        .withMessage("Type of e-mail must be string")
        .matches(emailPattern)
        .withMessage("E-mail must be in correct format"),
];
