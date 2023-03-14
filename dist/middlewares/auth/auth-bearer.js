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
exports.authBearer = void 0;
const jwt_service_1 = require("../../application/jwt-service");
const mongodb_users_query_repository_1 = require("../../repositories/query-repos/mongodb-users-query-repository");
const authBearer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = yield jwt_service_1.jwtService.getUserIdByToken(token);
    if (userId) {
        req.user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByIdWithMongoId(userId);
        next();
    }
    else {
        res.sendStatus(401);
    }
});
exports.authBearer = authBearer;
