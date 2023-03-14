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
exports.blogsQueryRepository = void 0;
const _mongodb_connect_1 = require("../_mongodb-connect");
const func_blog_mapping_1 = require("../../functions/mappings/func-blog-mapping");
const func_filter_1 = require("../../functions/global/func-filter");
const func_sorting_1 = require("../../functions/global/func-sorting");
const func_pagination_1 = require("../../functions/global/func-pagination");
const func_output_1 = require("../../functions/global/func-output");
exports.blogsQueryRepository = {
    // Return blogs with query
    findBlogs(searchNameTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter
            const blogsFilter = yield (0, func_filter_1.funcFilter)(undefined, undefined, searchNameTerm);
            // Pagination
            const blogsPagination = yield (0, func_pagination_1.funcPagination)(yield (0, func_sorting_1.funcSorting)(sortBy, sortDirection), Number(pageNumber) || 1, Number(pageSize) || 10, _mongodb_connect_1.blogsCollection, blogsFilter);
            // Output
            return (0, func_output_1.funcOutput)(Number(pageNumber) || 1, Number(pageSize) || 10, blogsPagination, _mongodb_connect_1.blogsCollection, func_blog_mapping_1.funcBlogMapping, blogsFilter);
        });
    },
    // Return blog by ID
    findBlogById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundBlog = yield _mongodb_connect_1.blogsCollection.findOne({ _id });
            if (!foundBlog) {
                return null;
            }
            return {
                id: foundBlog._id.toString(),
                name: foundBlog.name,
                description: foundBlog.description,
                websiteUrl: foundBlog.websiteUrl,
                createdAt: foundBlog.createdAt,
                isMembership: foundBlog.isMembership,
            };
        });
    },
};
