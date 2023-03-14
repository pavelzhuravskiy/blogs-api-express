"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorCheck = void 0;
const express_validator_1 = require("express-validator");
const validationErrorCheck = (req, res, next) => {
    const errorFormatter = ({ msg, param }) => {
        return {
            message: msg,
            field: param,
        };
    };
    const result = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    const idFinder = result.array().find((e) => e.field === "id");
    if (idFinder) {
        res.status(404).json({ errorsMessages: result.array() });
        return;
    }
    if (!result.isEmpty()) {
        res.status(400).json({ errorsMessages: result.array({ onlyFirstError: true }) });
    }
    else {
        next();
    }
};
exports.validationErrorCheck = validationErrorCheck;
