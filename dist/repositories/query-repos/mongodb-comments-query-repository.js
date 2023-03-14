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
exports.commentsQueryRepository = void 0;
const _mongodb_connect_1 = require("../_mongodb-connect");
const func_comments_mapping_1 = require("../../functions/mappings/func-comments-mapping");
const func_pagination_1 = require("../../functions/global/func-pagination");
const func_sorting_1 = require("../../functions/global/func-sorting");
const func_output_1 = require("../../functions/global/func-output");
const func_filter_1 = require("../../functions/global/func-filter");
exports.commentsQueryRepository = {
    // Return comments with query
    findComments(sortBy, sortDirection, pageNumber, pageSize, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter
            const commentsFilter = yield (0, func_filter_1.funcFilter)(undefined, postId);
            // Pagination
            const commentsPagination = yield (0, func_pagination_1.funcPagination)(yield (0, func_sorting_1.funcSorting)(sortBy, sortDirection), Number(pageNumber) || 1, Number(pageSize) || 10, _mongodb_connect_1.commentsCollection, commentsFilter);
            // Output
            return (0, func_output_1.funcOutput)(Number(pageNumber) || 1, Number(pageSize) || 10, commentsPagination, _mongodb_connect_1.commentsCollection, func_comments_mapping_1.funcCommentsMapping, commentsFilter);
        });
    },
    findCommentById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundComment = yield _mongodb_connect_1.commentsCollection.findOne({ _id });
            if (!foundComment) {
                return null;
            }
            return {
                id: foundComment._id.toString(),
                content: foundComment.content,
                commentatorInfo: {
                    userId: foundComment.commentatorInfo.userId,
                    userLogin: foundComment.commentatorInfo.userLogin,
                },
                createdAt: foundComment.createdAt,
            };
        });
    },
};
