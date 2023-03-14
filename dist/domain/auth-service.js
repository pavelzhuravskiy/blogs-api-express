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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const email_manager_1 = require("../managers/email-manager");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_1 = require("mongodb");
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
const mongodb_users_repository_1 = require("../repositories/mongodb-users-repository");
const mongodb_users_query_repository_1 = require("../repositories/query-repos/mongodb-users-query-repository");
exports.authService = {
    // Register new user
    registerUser(login, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(password, 10);
            const newUser = {
                _id: new mongodb_1.ObjectId(),
                accountData: {
                    login,
                    password: hash,
                    email,
                    createdAt: new Date().toISOString(),
                    isMembership: false,
                },
                emailConfirmation: {
                    confirmationCode: (0, crypto_1.randomUUID)(),
                    expirationDate: (0, date_fns_1.add)(new Date(), {
                        hours: 1,
                        minutes: 3,
                    }),
                    isConfirmed: false,
                },
            };
            const createResult = yield mongodb_users_repository_1.usersRepository.createUser(newUser);
            try {
                yield email_manager_1.emailManager.sendRegistrationEmail(newUser.accountData.email, newUser.emailConfirmation.confirmationCode);
            }
            catch (error) {
                console.error(error);
                yield mongodb_users_repository_1.usersRepository.deleteUser(newUser._id);
                return null;
            }
            return createResult;
        });
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByCode(code);
            if (!user) {
                return false;
            }
            return yield mongodb_users_repository_1.usersRepository.updateConfirmation(user._id);
        });
    },
};
