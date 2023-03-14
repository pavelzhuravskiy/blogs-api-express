"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const users_service_1 = require("../domain/users-service");
const jwt_service_1 = require("../application/jwt-service");
const mongodb_users_query_repository_1 = require("../repositories/query-repos/mongodb-users-query-repository");
const auth_bearer_1 = require("../middlewares/auth/auth-bearer");
const validation_auth_input_1 = require("../middlewares/validations/input/validation-auth-input");
const _validation_error_check_1 = require("../middlewares/validations/_validation-error-check");
const validation_user_unique_1 = require("../middlewares/validations/validation-user-unique");
const validation_users_input_1 = require("../middlewares/validations/input/validation-users-input");
const auth_service_1 = require("../domain/auth-service");
const validation_email_confirm_1 = require("../middlewares/validations/validation-email-confirm");
const validation_code_input_1 = require("../middlewares/validations/input/validation-code-input");
const validation_email_resend_1 = require("../middlewares/validations/validation-email-resend");
const validation_email_resend_input_1 = require("../middlewares/validations/input/validation-email-resend-input");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/login", validation_auth_input_1.validationAuthInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield users_service_1.usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if (check) {
        const user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByLoginOrEmail(req.body.loginOrEmail);
        const token = yield jwt_service_1.jwtService.createJWT(user);
        res.status(200).json(token);
    }
    else {
        res.sendStatus(401);
    }
}));
exports.authRouter.get("/me", auth_bearer_1.authBearer, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accountInfo = {
        email: req.user.accountData.email,
        login: req.user.accountData.login,
        userId: req.user._id,
    };
    res.status(200).json(accountInfo);
}));
exports.authRouter.post("/registration", (0, validation_user_unique_1.validationUserUnique)("login"), (0, validation_user_unique_1.validationUserUnique)("email"), validation_users_input_1.validationUsersInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.registerUser(req.body.login, req.body.password, req.body.email);
    if (user) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(400);
    }
}));
exports.authRouter.post("/registration-confirmation", validation_code_input_1.validationCodeInput, validation_email_confirm_1.validationEmailConfirm, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.authService.confirmEmail(req.body.code);
    res.sendStatus(204);
}));
exports.authRouter.post("/registration-email-resending", validation_email_resend_input_1.validationEmailResendInput, validation_email_resend_1.validationEmailResend, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_service_1.authService.confirmEmail(req.body.code);
    res.sendStatus(204);
}));
