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
exports.funcOutput = void 0;
const funcOutput = (pageNumber, pageSize, output, collection, mapping, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const totalCount = yield collection.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);
    return {
        pagesCount: pagesCount,
        page: pageNumber,
        pageSize: pageSize,
        totalCount,
        items: mapping(output),
    };
});
exports.funcOutput = funcOutput;
