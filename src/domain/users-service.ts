import { ObjectId } from "mongodb";
import { MongoUserModel } from "../models/users/MongoUserModel";
import { usersRepository } from "../repositories/mongodb-users-repository";
import bcrypt from "bcrypt";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";

export const usersService = {
  // Create new user
  async createNewUser(
    login: string,
    password: string,
    email: string
  ): Promise<MongoUserModel | null> {
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      _id: new ObjectId(),
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
    return await usersRepository.createUser(newUser);
  },

  // Credentials check
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(
      loginOrEmail
    );

    // ***** LET USER LOGIN WITHOUT EMAIL CONFIRMATION *****

    /*if (!user) {
      return false;
    }*/

    // ***** LET USER LOGIN WITHOUT EMAIL CONFIRMATION *****

    if (!user || !user.emailConfirmation.isConfirmed) {
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