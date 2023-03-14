"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationCodeInput = void 0;
const express_validator_1 = require("express-validator");
exports.validationCodeInput = [
    (0, express_validator_1.body)("code")
        .exists()
        .withMessage("Confirmation code is required")
        .isString()
        .withMessage("Type of confirmation code must be string")
];
