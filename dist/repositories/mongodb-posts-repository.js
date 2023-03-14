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
exports.postsRepository = void 0;
const _mongodb_connect_1 = require("./_mongodb-connect");
exports.postsRepository = {
    // Create new post
    createNewPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedPost = yield _mongodb_connect_1.postsCollection.insertOne(newPost);
            return {
                id: insertedPost.insertedId.toString(),
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                blogName: newPost.blogName,
                createdAt: newPost.createdAt,
            };
        });
    },
    // Update existing post
    updatePost(_id, title, shortDescription, content, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.postsCollection.updateOne({ _id }, {
                $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    blogId: blogId,
                },
            });
            return result.matchedCount === 1;
        });
    },
    // Delete existing post
    deletePost(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.postsCollection.deleteOne({ _id });
            return result.deletedCount === 1;
        });
    },
    // Delete all posts
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _mongodb_connect_1.postsCollection.deleteMany({});
            return (yield _mongodb_connect_1.postsCollection.countDocuments()) === 0;
        });
    },
};
