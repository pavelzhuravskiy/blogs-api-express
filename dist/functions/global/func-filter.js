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
exports.funcFilter = void 0;
const funcFilter = (blogId = null, postId = null, searchNameTerm = null, searchLoginTerm = null, searchEmailTerm = null) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (blogId) {
        filter.blogId = blogId.toString();
    }
    if (postId) {
        filter.postId = postId.toString();
    }
    if (searchNameTerm) {
        filter.name = { $regex: searchNameTerm, $options: "i" };
    }
    if (searchLoginTerm || searchEmailTerm) {
        filter.$or = [];
        if (searchLoginTerm) {
            filter.$or.push({
                "accountData.login": { $regex: searchLoginTerm, $options: "i" },
            });
        }
        if (searchEmailTerm) {
            filter.$or.push({
                "accountData.email": { $regex: searchEmailTerm, $options: "i" },
            });
        }
    }
    return filter;
});
exports.funcFilter = funcFilter;
