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
exports.commentsService = void 0;
const mongodb_1 = require("mongodb");
const mongodb_posts_query_repository_1 = require("../repositories/query-repos/mongodb-posts-query-repository");
const mongodb_comments_repository_1 = require("../repositories/mongodb-comments-repository");
const mongodb_users_query_repository_1 = require("../repositories/query-repos/mongodb-users-query-repository");
exports.commentsService = {
    // Create new comment
    createNewCommentByPostId(_id, content, _userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongodb_posts_query_repository_1.postsQueryRepository.findPostById(new mongodb_1.ObjectId(_id));
            if (!post) {
                return false;
            }
            const user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByIdWithMongoId(_userId);
            const newComment = Object.assign(Object.assign({}, content), { commentatorInfo: {
                    userId: user._id.toString(),
                    userLogin: user.accountData.login,
                }, postId: _id.toString(), createdAt: new Date().toISOString() });
            return mongodb_comments_repository_1.commentsRepository.createNewComment(newComment);
        });
    },
    // Update existing comment
    updateComment(_id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_comments_repository_1.commentsRepository.updateComment(_id, comment.content);
        });
    },
    // Delete existing comment
    deleteComment(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_comments_repository_1.commentsRepository.deleteComment(_id);
        });
    },
    // Delete all comments
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_comments_repository_1.commentsRepository.deleteAll();
        });
    },
};
