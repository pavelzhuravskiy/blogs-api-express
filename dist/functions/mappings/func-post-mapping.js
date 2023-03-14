"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcPostMapping = void 0;
const funcPostMapping = (array) => {
    return array.map((post) => {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
        };
    });
};
exports.funcPostMapping = funcPostMapping;
