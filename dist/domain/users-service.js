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
exports.usersService = void 0;
const mongodb_1 = require("mongodb");
const mongodb_users_repository_1 = require("../repositories/mongodb-users-repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_users_query_repository_1 = require("../repositories/query-repos/mongodb-users-query-repository");
exports.usersService = {
    // Create new user
    createNewUser(login, password, email) {
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
                    confirmationCode: null,
                    expirationDate: null,
                    isConfirmed: true,
                },
            };
            return yield mongodb_users_repository_1.usersRepository.createUser(newUser);
        });
    },
    // Credentials check
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongodb_users_query_repository_1.usersQueryRepository.findUserByLoginOrEmail(loginOrEmail);
            // ***** LET USER LOGIN WITHOUT EMAIL CONFIRMATION *****
            /*if (!user) {
              return false;
            }*/
            // ***** LET USER LOGIN WITHOUT EMAIL CONFIRMATION *****
            if (!user || !user.emailConfirmation.isConfirmed) {
                return false;
            }
            return yield bcrypt_1.default.compare(password, user.accountData.password);
        });
    },
    // Delete user by ID
    deleteUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_users_repository_1.usersRepository.deleteUser(_id);
        });
    },
    // Delete all posts
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongodb_users_repository_1.usersRepository.deleteAll();
        });
    },
};
