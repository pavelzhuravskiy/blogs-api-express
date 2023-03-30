import { ObjectId } from "mongodb";
import { UserViewModel } from "../models/view/UserViewModel";
import { usersRepository } from "../repositories/users-repository";
import bcrypt from "bcrypt";

export const usersService = {
  // Create new user
  async createNewUser(
    login: string,
    password: string,
    email: string
  ): Promise<UserViewModel | null> {
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
      passwordRecovery: {
        recoveryCode: null,
        expirationDate: null,
      },
    };
    return usersRepository.createUser(newUser);
  },

  // Credentials check
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user || !user.emailConfirmation.isConfirmed) {
      return false;
    }
    return bcrypt.compare(password, user.accountData.password);
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