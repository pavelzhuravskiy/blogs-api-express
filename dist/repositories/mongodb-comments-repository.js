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
exports.commentsRepository = void 0;
const _mongodb_connect_1 = require("./_mongodb-connect");
exports.commentsRepository = {
    // Create new comment
    createNewComment(newComment) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedComment = yield _mongodb_connect_1.commentsCollection.insertOne(newComment);
            return {
                id: insertedComment.insertedId.toString(),
                content: newComment.content,
                commentatorInfo: {
                    userId: newComment.commentatorInfo.userId,
                    userLogin: newComment.commentatorInfo.userLogin,
                },
                createdAt: newComment.createdAt,
            };
        });
    },
    // Update existing comment
    updateComment(_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.commentsCollection.updateOne({ _id }, {
                $set: {
                    content: content,
                },
            });
            return result.matchedCount === 1;
        });
    },
    // Delete existing comment
    deleteComment(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.commentsCollection.deleteOne({ _id });
            return result.deletedCount === 1;
        });
    },
    // Delete all comments
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _mongodb_connect_1.commentsCollection.deleteMany({});
            return (yield _mongodb_connect_1.commentsCollection.countDocuments()) === 0;
        });
    },
};
