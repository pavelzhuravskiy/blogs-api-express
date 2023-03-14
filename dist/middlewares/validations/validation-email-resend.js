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
exports.validationEmailResend = void 0;
const express_validator_1 = require("express-validator");
const mongodb_users_query_repository_1 = require("../../repositories/query-repos/mongodb-users-query-repository");
exports.validationEmailResend = (0, express_validator_1.body)("email").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByLoginOrEmail(value);
    if (!user || user.emailConfirmation.isConfirmed) {
        throw new Error("User with provided email not found or is already confirmed");
    }
    return true;
}));
