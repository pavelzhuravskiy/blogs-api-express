"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcCommentsMapping = void 0;
const funcCommentsMapping = (array) => {
    return array.map((comment) => {
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin,
            },
            createdAt: comment.createdAt,
        };
    });
};
exports.funcCommentsMapping = funcCommentsMapping;
