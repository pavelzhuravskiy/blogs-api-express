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
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_service_1 = require("../domain/posts-service");
const auth_basic_1 = require("../middlewares/auth/auth-basic");
const validation_posts_input_1 = require("../middlewares/validations/input/validation-posts-input");
const _validation_error_check_1 = require("../middlewares/validations/_validation-error-check");
const mongodb_1 = require("mongodb");
const validation_posts_creation_1 = require("../middlewares/validations/validation-posts-creation");
const validation_posts_find_by_param_id_1 = require("../middlewares/validations/find-by-id/validation-posts-find-by-param-id");
const mongodb_posts_query_repository_1 = require("../repositories/query-repos/mongodb-posts-query-repository");
const validation_comments_input_1 = require("../middlewares/validations/input/validation-comments-input");
const mongodb_comments_query_repository_1 = require("../repositories/query-repos/mongodb-comments-query-repository");
const comments_service_1 = require("../domain/comments-service");
const auth_bearer_1 = require("../middlewares/auth/auth-bearer");
exports.postsRouter = (0, express_1.Router)({});
exports.postsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPosts = yield mongodb_posts_query_repository_1.postsQueryRepository.findPosts(req.query.sortBy, req.query.sortDirection, req.query.pageNumber, req.query.pageSize);
    res.json(foundPosts);
}));
exports.postsRouter.get("/:id", validation_posts_find_by_param_id_1.validationPostsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPost = yield mongodb_posts_query_repository_1.postsQueryRepository.findPostById(new mongodb_1.ObjectId(req.params.id));
    res.json(foundPost);
}));
exports.postsRouter.post("/", auth_basic_1.authBasic, validation_posts_input_1.validationPostsInput, validation_posts_creation_1.validationPostsCreation, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_service_1.postsService.createNewPost(req.body);
    res.status(201).json(newPost);
}));
exports.postsRouter.put("/:id", auth_basic_1.authBasic, validation_posts_find_by_param_id_1.validationPostsFindByParamId, validation_posts_input_1.validationPostsInput, validation_posts_creation_1.validationPostsCreation, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield posts_service_1.postsService.updatePost(new mongodb_1.ObjectId(req.params.id), req.body);
    if (isUpdated) {
        const updatedPost = yield mongodb_posts_query_repository_1.postsQueryRepository.findPostById(req.body.id);
        res.status(204).json(updatedPost);
    }
}));
exports.postsRouter.delete("/:id", auth_basic_1.authBasic, validation_posts_find_by_param_id_1.validationPostsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_service_1.postsService.deletePost(new mongodb_1.ObjectId(req.params.id));
    if (isDeleted) {
        res.sendStatus(204);
    }
}));
exports.postsRouter.delete("/", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield posts_service_1.postsService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
// +++++ Comments section start +++++
exports.postsRouter.get("/:id/comments", validation_posts_find_by_param_id_1.validationPostsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundComments = yield mongodb_comments_query_repository_1.commentsQueryRepository.findComments(req.query.sortBy, req.query.sortDirection, req.query.pageNumber, req.query.pageSize, new mongodb_1.ObjectId(req.params.id));
    res.json(foundComments);
}));
exports.postsRouter.post("/:id/comments", auth_bearer_1.authBearer, validation_posts_find_by_param_id_1.validationPostsFindByParamId, validation_comments_input_1.ValidationCommentsInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = yield comments_service_1.commentsService.createNewCommentByPostId(new mongodb_1.ObjectId(req.params.id), req.body, req.user._id);
    res.status(201).json(newComment);
}));
// ----- Comments section end -----
