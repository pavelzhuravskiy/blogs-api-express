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
        }),
        isConfirmed: false,
      },
      passwordConfirmation: {
        confirmationCode: null,
        expirationDate: null,
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
    const user = await usersQueryRepository.findUserByEmailConfirmationCode(code);
    if (!user) {
      return false;
    }
    return usersRepository.updateEmailConfirmationStatus(user._id);
  },

  async resendEmail(email: string): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(email);
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
    return usersRepository.updateEmailConfirmationCode(
      user._id,
      newConfirmationCode
    );
  },

  // Send password recovery code
  async sendPasswordRecoveryCode(email: string): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(email);

    if (!user) {
      return false;
    }

    const userId = user._id;
    const confirmationCode = randomUUID();
    const expirationDate = add(new Date(), {
      hours: 1,
    })

    const updateResult = await usersRepository.updatePasswordConfirmationData(
      userId,
      confirmationCode,
      expirationDate
    );

    try {
      await emailManager.sendChangePasswordEmail(email, confirmationCode);
    } catch (error) {
      console.error(error);
      return false;
    }

    return updateResult
  },

  // Send password recovery code
  async changePassword(code: string, password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    const user = await usersQueryRepository.findUserByPasswordConfirmationCode(code);
    if (!user) {
      return false;
    }
    return usersRepository.updatePassword(user._id, hash);

  },

};