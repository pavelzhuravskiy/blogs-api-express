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
exports.usersQueryRepository = void 0;
const _mongodb_connect_1 = require("../_mongodb-connect");
const func_user_mapping_1 = require("../../functions/mappings/func-user-mapping");
const func_filter_1 = require("../../functions/global/func-filter");
const func_pagination_1 = require("../../functions/global/func-pagination");
const func_sorting_1 = require("../../functions/global/func-sorting");
const func_output_1 = require("../../functions/global/func-output");
exports.usersQueryRepository = {
    // Return users with query
    findUsers(searchLoginTerm, searchEmailTerm, sortBy, sortDirection, pageNumber, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filter
            const usersFilter = yield (0, func_filter_1.funcFilter)(undefined, undefined, undefined, searchLoginTerm, searchEmailTerm);
            // Pagination
            const usersSortingField = sortBy
                ? `accountData.${sortBy}`
                : `accountData.createdAt`;
            const usersPagination = yield (0, func_pagination_1.funcPagination)(yield (0, func_sorting_1.funcSorting)(usersSortingField, sortDirection), Number(pageNumber) || 1, Number(pageSize) || 10, _mongodb_connect_1.usersCollection, usersFilter);
            // Output
            return (0, func_output_1.funcOutput)(Number(pageNumber) || 1, Number(pageSize) || 10, usersPagination, _mongodb_connect_1.usersCollection, func_user_mapping_1.funcUserMapping, usersFilter);
        });
    },
    // Return user with string ID
    findUserByIdWithStringId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield _mongodb_connect_1.usersCollection.findOne({ _id });
            if (!foundUser) {
                return null;
            }
            return {
                id: foundUser._id.toString(),
                email: foundUser.accountData.email,
                login: foundUser.accountData.login,
                createdAt: foundUser.accountData.createdAt,
            };
        });
    },
    findUserByIdWithMongoId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield _mongodb_connect_1.usersCollection.findOne({ _id });
            if (!foundUser) {
                return null;
            }
            return foundUser;
        });
    },
    findUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _mongodb_connect_1.usersCollection.findOne({
                $or: [
                    { "accountData.login": loginOrEmail },
                    { "accountData.email": loginOrEmail },
                ],
            });
        });
    },
    findUserByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield _mongodb_connect_1.usersCollection.findOne({
                "emailConfirmation.confirmationCode": code,
            });
        });
    },
};
