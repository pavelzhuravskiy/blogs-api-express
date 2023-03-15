import { emailManager } from "../managers/email-manager";
import { MongoUserModel } from "../models/users/MongoUserModel";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { usersRepository } from "../repositories/mongodb-users-repository";
import { usersQueryRepository } from "../repositories/query-repos/mongodb-users-query-repository";

export const authService = {
  // Register new user
  async registerUser(
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
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 3,
        }),
        isConfirmed: false,
      },
    };
    const createResult = await usersRepository.createUser(newUser);
    try {
      await emailManager.sendRegistrationEmail(
        newUser.accountData.email,
        newUser.emailConfirmation.confirmationCode
      );
    } catch (error) {
      console.error(error);
      await usersRepository.deleteUser(newUser._id);
      return null;
    }
    return createResult;
  },

  async confirmEmail(code: string): Promise<boolean> {
    const user = await usersQueryRepository.findUserByCode(code);
    if (!user) {
      return false;
    }
    return await usersRepository.updateConfirmation(user._id);
  },

  async resendEmail(email: string): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(email);
    console.log(user);
    if (!user || !user.emailConfirmation.confirmationCode) {
      return false;
    }
    const newConfirmationCode = randomUUID();
    try {
      await emailManager.sendRegistrationEmail(
        user.accountData.email,
        newConfirmationCode
      );
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  },
};