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
exports.blogsService = void 0;
const mongodb_blogs_repository_1 = require("../repositories/mongodb-blogs-repository");
exports.blogsService = {
    // Create new blog
    createNewBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = Object.assign(Object.assign({}, blog), { createdAt: new Date().toISOString(), isMembership: false });
            return mongodb_blogs_repository_1.blogsRepository.createNewBlog(newBlog);
        });
    },
    // Update existing blog
    updateBlog(_id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_blogs_repository_1.blogsRepository.updateBlog(_id, blog.name, blog.description, blog.websiteUrl);
        });
    },
    // Delete existing blog
    deleteBlog(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_blogs_repository_1.blogsRepository.deleteBlog(_id);
        });
    },
    // Delete all blogs
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_blogs_repository_1.blogsRepository.deleteAll();
        });
    },
};
