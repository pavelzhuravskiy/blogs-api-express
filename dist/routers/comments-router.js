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
exports.commentsRouter = void 0;
const express_1 = require("express");
const _validation_error_check_1 = require("../middlewares/validations/_validation-error-check");
const mongodb_1 = require("mongodb");
const validation_comments_find_by_param_id_1 = require("../middlewares/validations/find-by-id/validation-comments-find-by-param-id");
const mongodb_comments_query_repository_1 = require("../repositories/query-repos/mongodb-comments-query-repository");
const comments_service_1 = require("../domain/comments-service");
const validation_comments_input_1 = require("../middlewares/validations/input/validation-comments-input");
const auth_bearer_1 = require("../middlewares/auth/auth-bearer");
const validation_comment_owner_1 = require("../middlewares/validations/validation-comment-owner");
const auth_basic_1 = require("../middlewares/auth/auth-basic");
exports.commentsRouter = (0, express_1.Router)({});
exports.commentsRouter.get("/:id", validation_comments_find_by_param_id_1.validationCommentsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundComment = yield mongodb_comments_query_repository_1.commentsQueryRepository.findCommentById(new mongodb_1.ObjectId(req.params.id));
    res.json(foundComment);
}));
exports.commentsRouter.put("/:id", validation_comments_find_by_param_id_1.validationCommentsFindByParamId, auth_bearer_1.authBearer, validation_comments_input_1.ValidationCommentsInput, _validation_error_check_1.validationErrorCheck, validation_comment_owner_1.validationCommentOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield comments_service_1.commentsService.updateComment(new mongodb_1.ObjectId(req.params.id), req.body);
    if (isUpdated) {
        const updatedComment = yield mongodb_comments_query_repository_1.commentsQueryRepository.findCommentById(req.body.id);
        res.status(204).json(updatedComment);
    }
}));
exports.commentsRouter.delete("/:id", validation_comments_find_by_param_id_1.validationCommentsFindByParamId, _validation_error_check_1.validationErrorCheck, auth_bearer_1.authBearer, validation_comment_owner_1.validationCommentOwner, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield comments_service_1.commentsService.deleteComment(new mongodb_1.ObjectId(req.params.id));
    if (isDeleted) {
        res.sendStatus(204);
    }
}));
exports.commentsRouter.delete("/", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield comments_service_1.commentsService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
