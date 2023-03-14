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
exports.usersRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const _validation_error_check_1 = require("../middlewares/validations/_validation-error-check");
const mongodb_users_query_repository_1 = require("../repositories/query-repos/mongodb-users-query-repository");
const validation_users_input_1 = require("../middlewares/validations/input/validation-users-input");
const users_service_1 = require("../domain/users-service");
const validation_users_find_by_param_id_1 = require("../middlewares/validations/find-by-id/validation-users-find-by-param-id");
const validation_user_unique_1 = require("../middlewares/validations/validation-user-unique");
const auth_basic_1 = require("../middlewares/auth/auth-basic");
exports.usersRouter = (0, express_1.Router)({});
exports.usersRouter.get("/", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield mongodb_users_query_repository_1.usersQueryRepository.findUsers(req.query.searchLoginTerm, req.query.searchEmailTerm, req.query.sortBy, req.query.sortDirection, req.query.pageNumber, req.query.pageSize);
    res.json(foundBlogs);
}));
exports.usersRouter.post("/", auth_basic_1.authBasic, (0, validation_user_unique_1.validationUserUnique)("login"), (0, validation_user_unique_1.validationUserUnique)("email"), validation_users_input_1.validationUsersInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_service_1.usersService.createNewUser(req.body.login, req.body.password, req.body.email);
    res.status(201).json(newUser);
}));
exports.usersRouter.delete("/:id", auth_basic_1.authBasic, validation_users_find_by_param_id_1.validationUsersFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield users_service_1.usersService.deleteUser(new mongodb_1.ObjectId(req.params.id));
    if (isDeleted) {
        res.sendStatus(204);
    }
}));
exports.usersRouter.delete("/", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield users_service_1.usersService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
