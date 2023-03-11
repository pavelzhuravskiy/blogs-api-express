import { ObjectId } from "mongodb";
import { MongoUserModel } from "../models/users/MongoUserModel";
import { usersRepository } from "../repositories/mongodb-users-repository";
import bcrypt from "bcrypt";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";
import {randomUUID} from "crypto";
import { add } from "date-fns";

export const usersService = {
  // Create new user
  async createNewUser(
    login: string,
    password: string,
    email: string
  ): Promise<MongoUserModel> {
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      accountData: {
        login,
        password: hash,
        email,
        createdAt: new Date().toISOString(),
        isMembership: false,
      },
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 3
        }),
        isConfirmed: false
      }
    };
    return usersRepository.createNewUser(newUser);
  },

  // Credentials check
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(
      loginOrEmail
    );
    if (!user) {
      return false;
    }
    return await bcrypt.compare(password, user.accountData.password);
  },

  // Delete user by ID
  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  },

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    return usersRepository.deleteAll();
  },
};