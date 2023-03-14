"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationAuthInput = void 0;
const express_validator_1 = require("express-validator");
exports.validationAuthInput = [
    (0, express_validator_1.body)("loginOrEmail")
        .exists()
        .withMessage("Login or email is required")
        .isString()
        .withMessage("Type of login or email must be string"),
    (0, express_validator_1.body)("password")
        .exists()
        .withMessage("Password is required")
        .isString()
        .withMessage("Type of password must be string"),
];
