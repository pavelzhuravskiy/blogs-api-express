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
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_service_1 = require("../domain/blogs-service");
const mongodb_1 = require("mongodb");
const auth_basic_1 = require("../middlewares/auth/auth-basic");
const validation_blogs_input_1 = require("../middlewares/validations/input/validation-blogs-input");
const _validation_error_check_1 = require("../middlewares/validations/_validation-error-check");
const validation_blogs_find_by_param_id_1 = require("../middlewares/validations/find-by-id/validation-blogs-find-by-param-id");
const posts_service_1 = require("../domain/posts-service");
const validation_posts_input_1 = require("../middlewares/validations/input/validation-posts-input");
const mongodb_blogs_query_repository_1 = require("../repositories/query-repos/mongodb-blogs-query-repository");
const mongodb_posts_query_repository_1 = require("../repositories/query-repos/mongodb-posts-query-repository");
exports.blogsRouter = (0, express_1.Router)({});
exports.blogsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlogs = yield mongodb_blogs_query_repository_1.blogsQueryRepository.findBlogs(req.query.searchNameTerm, req.query.sortBy, req.query.sortDirection, req.query.pageNumber, req.query.pageSize);
    res.json(foundBlogs);
}));
exports.blogsRouter.get("/:id", validation_blogs_find_by_param_id_1.validationBlogsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield mongodb_blogs_query_repository_1.blogsQueryRepository.findBlogById(new mongodb_1.ObjectId(req.params.id));
    res.json(foundBlog);
}));
exports.blogsRouter.get("/:id/posts", validation_blogs_find_by_param_id_1.validationBlogsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPosts = yield mongodb_posts_query_repository_1.postsQueryRepository.findPosts(req.query.sortBy, req.query.sortDirection, req.query.pageNumber, req.query.pageSize, new mongodb_1.ObjectId(req.params.id));
    res.json(foundPosts);
}));
exports.blogsRouter.post("/", auth_basic_1.authBasic, validation_blogs_input_1.validationBlogsInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_service_1.blogsService.createNewBlog(req.body);
    res.status(201).json(newBlog);
}));
// +++++ Post creation section start +++++
exports.blogsRouter.post("/:id/posts", auth_basic_1.authBasic, validation_blogs_find_by_param_id_1.validationBlogsFindByParamId, validation_posts_input_1.validationPostsInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = yield posts_service_1.postsService.createNewPostByBlogId(new mongodb_1.ObjectId(req.params.id), req.body);
    res.status(201).json(newPost);
}));
// ----- Post creation section start -----
exports.blogsRouter.put("/:id", auth_basic_1.authBasic, validation_blogs_find_by_param_id_1.validationBlogsFindByParamId, validation_blogs_input_1.validationBlogsInput, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield blogs_service_1.blogsService.updateBlog(new mongodb_1.ObjectId(req.params.id), req.body);
    if (isUpdated) {
        const updatedBlog = yield mongodb_blogs_query_repository_1.blogsQueryRepository.findBlogById(req.body.id);
        res.status(204).json(updatedBlog);
    }
}));
exports.blogsRouter.delete("/:id", auth_basic_1.authBasic, validation_blogs_find_by_param_id_1.validationBlogsFindByParamId, _validation_error_check_1.validationErrorCheck, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteBlog(new mongodb_1.ObjectId(req.params.id));
    if (isDeleted) {
        res.sendStatus(204);
    }
}));
exports.blogsRouter.delete("/", auth_basic_1.authBasic, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield blogs_service_1.blogsService.deleteAll();
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
