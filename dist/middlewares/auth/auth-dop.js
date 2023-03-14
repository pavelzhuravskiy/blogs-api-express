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
exports.authDop = void 0;
const mongodb_comments_query_repository_1 = require("../../repositories/query-repos/mongodb-comments-query-repository");
const mongodb_1 = require("mongodb");
const authDop = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const foundComment = yield mongodb_comments_query_repository_1.commentsQueryRepository.findCommentById(new mongodb_1.ObjectId(req.params.id));
    if (foundComment &&
        foundComment.commentatorInfo.userId === req.user._id.toString()) {
        next();
    }
    else {
        res.sendStatus(403);
        return;
    }
});
exports.authDop = authDop;
