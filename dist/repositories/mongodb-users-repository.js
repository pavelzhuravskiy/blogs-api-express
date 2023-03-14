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
exports.usersRepository = void 0;
const _mongodb_connect_1 = require("./_mongodb-connect");
exports.usersRepository = {
    // Create new user
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertedUser = yield _mongodb_connect_1.usersCollection.insertOne(user);
            return {
                id: insertedUser.insertedId.toString(),
                login: user.accountData.login,
                email: user.accountData.email,
                createdAt: user.accountData.createdAt,
            };
        });
    },
    // Delete existing user
    deleteUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.usersCollection.deleteOne({ _id });
            return result.deletedCount === 1;
        });
    },
    // Delete all users
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield _mongodb_connect_1.usersCollection.deleteMany({});
            return (yield _mongodb_connect_1.usersCollection.countDocuments()) === 0;
        });
    },
    // Update user confirmation status
    updateConfirmation(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _mongodb_connect_1.usersCollection.updateOne({ _id }, { $set: { "emailConfirmation.isConfirmed": true } });
            return result.modifiedCount === 1;
        });
    },
};
