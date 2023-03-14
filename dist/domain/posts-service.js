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
exports.postsService = void 0;
const mongodb_1 = require("mongodb");
const mongodb_posts_repository_1 = require("../repositories/mongodb-posts-repository");
const mongodb_blogs_query_repository_1 = require("../repositories/query-repos/mongodb-blogs-query-repository");
exports.postsService = {
    // Create new post
    createNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongodb_blogs_query_repository_1.blogsQueryRepository.findBlogById(new mongodb_1.ObjectId(post.blogId));
            if (!blog) {
                return false;
            }
            const newPost = Object.assign(Object.assign({}, post), { blogName: blog.name, createdAt: new Date().toISOString() });
            return mongodb_posts_repository_1.postsRepository.createNewPost(newPost);
        });
    },
    // Create new post
    createNewPostByBlogId(_id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongodb_blogs_query_repository_1.blogsQueryRepository.findBlogById(new mongodb_1.ObjectId(_id));
            if (!blog) {
                return false;
            }
            const newPost = Object.assign(Object.assign({}, post), { blogId: _id.toString(), blogName: blog.name, createdAt: new Date().toISOString() });
            return mongodb_posts_repository_1.postsRepository.createNewPost(newPost);
        });
    },
    // Update existing post
    updatePost(_id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_posts_repository_1.postsRepository.updatePost(_id, post.title, post.shortDescription, post.content, post.blogId);
        });
    },
    // Delete existing post
    deletePost(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_posts_repository_1.postsRepository.deletePost(_id);
        });
    },
    // Delete all posts
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_posts_repository_1.postsRepository.deleteAll();
        });
    },
};
