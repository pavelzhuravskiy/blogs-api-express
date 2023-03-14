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
exports.testingRouter = void 0;
const express_1 = require("express");
const mongodb_blogs_repository_1 = require("../repositories/mongodb-blogs-repository");
const mongodb_posts_repository_1 = require("../repositories/mongodb-posts-repository");
const mongodb_users_repository_1 = require("../repositories/mongodb-users-repository");
const mongodb_comments_repository_1 = require("../repositories/mongodb-comments-repository");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete("/all-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongodb_blogs_repository_1.blogsRepository.deleteAll();
    yield mongodb_posts_repository_1.postsRepository.deleteAll();
    yield mongodb_users_repository_1.usersRepository.deleteAll();
    yield mongodb_comments_repository_1.commentsRepository.deleteAll();
    res.sendStatus(204);
}));
