"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcUserMapping = void 0;
const funcUserMapping = (array) => {
    return array.map((user) => {
        // return user
        return {
            id: user._id.toString(),
            login: user.accountData.login,
            email: user.accountData.email,
            createdAt: user.accountData.createdAt,
        };
    });
};
exports.funcUserMapping = funcUserMapping;
