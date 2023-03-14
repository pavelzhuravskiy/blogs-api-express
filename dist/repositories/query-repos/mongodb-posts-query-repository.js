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
exports.postsQueryRepository = void 0;
const _mongodb_connect_1 = require("../_mongodb-connect");
const func_post_mapping_1 = require("../../functions/mappings/func-post-mapping");
const func_sorting_1 = require("../../functions/global/func-sorting");
const func_pagination_1 = require("../../functions/global/func-pagination");
const func_output_1 = require("../../functions/global/func-output");
const func_filter_1 = require("../../functions/global/func-filter");
exports.postsQueryRepository = {
    // Return posts with query
    findPosts(sortBy, sortDirection, pageNumber, pageSize, blogId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter
            const postsFilter = yield (0, func_filter_1.funcFilter)(blogId);
            // Pagination
            const postsPagination = yield (0, func_pagination_1.funcPagination)(yield (0, func_sorting_1.funcSorting)(sortBy, sortDirection), Number(pageNumber) || 1, Number(pageSize) || 10, _mongodb_connect_1.postsCollection, postsFilter);
            // Output
            return (0, func_output_1.funcOutput)(Number(pageNumber) || 1, Number(pageSize) || 10, postsPagination, _mongodb_connect_1.postsCollection, func_post_mapping_1.funcPostMapping, postsFilter);
        });
    },
    // Return post by ID
    findPostById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPost = yield _mongodb_connect_1.postsCollection.findOne({ _id });
            if (!foundPost) {
                return null;
            }
            return {
                id: foundPost._id.toString(),
                title: foundPost.title,
                shortDescription: foundPost.shortDescription,
                content: foundPost.content,
                blogId: foundPost.blogId,
                blogName: foundPost.blogName,
                createdAt: foundPost.createdAt,
            };
        });
    },
};
