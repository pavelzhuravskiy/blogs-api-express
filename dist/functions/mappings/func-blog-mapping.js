"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcBlogMapping = void 0;
const funcBlogMapping = (array) => {
    return array.map((blog) => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership,
        };
    });
};
exports.funcBlogMapping = funcBlogMapping;
