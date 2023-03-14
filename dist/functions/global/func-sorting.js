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
exports.funcSorting = void 0;
const funcSorting = (sortBy = "createdAt", sortDirection = "desc") => __awaiter(void 0, void 0, void 0, function* () {
    const sortingObj = {};
    if (sortBy) {
        sortingObj[sortBy] = -1;
    }
    if (sortDirection === "asc") {
        sortingObj[sortBy] = 1;
    }
    return sortingObj;
});
exports.funcSorting = funcSorting;
