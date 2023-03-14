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
exports.blogsRepository = void 0;
const _mongodb_connect_1 = require("./_mongodb-connect");
exports.blogsRepository = {
    // Create new blog
    createNewBlog(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedBlog = yield _mongodb_connect_1.blogsCollection.insertOne(newBlog);
            return {
                id: insertedBlog.insertedId.toString(),
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership,
            };
        });
    },
    // Update existing blog
    updateBlog(_id, name, description, websiteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.blogsCollection.updateOne({ _id }, {
                $set: {
                    name: name,
                    description: description,
                    websiteUrl: websiteUrl,
                },
            });
            return result.matchedCount === 1;
        });
    },
    // Delete existing blog
    deleteBlog(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.blogsCollection.deleteOne({ _id });
            return result.deletedCount === 1;
        });
    },
    // Delete all blogs
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _mongodb_connect_1.blogsCollection.deleteMany({});
            return (yield _mongodb_connect_1.blogsCollection.countDocuments()) === 0;
        });
    },
};
