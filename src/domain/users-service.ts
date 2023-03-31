import { ObjectId } from "mongodb";
import { UserViewModel } from "../models/view/UserViewModel";
import { usersRepository } from "../repositories/users-repository";
import bcrypt from "bcrypt";
import { UserDBModel } from "../models/database/UserDBModel";

export const usersService = {
  // Find user in DB by ID
  async findUserById(_id: ObjectId): Promise<UserDBModel | null> {
    return usersRepository.findUserById(_id);
  },

  // Find user in DB by login or email
  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByLoginOrEmail(loginOrEmail);
  },

  // Find user in DB by email confirmation code
  async findUserByEmailConfirmationCode(
    code: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByEmailConfirmationCode(code);
  },

  // Find user in DB by password recovery code
  async findUserByPasswordRecoveryCode(
    recoveryCode: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByPasswordRecoveryCode(recoveryCode);
  },

  // Create new user
  async createNewUser(
    login: string,
    password: string,
    email: string
  ): Promise<UserViewModel | null> {
    const hash = await bcrypt.hash(password, 10);
    const newUser = new UserDBModel(
      new ObjectId(),
      {
        login,
        password: hash,
        email,
        createdAt: new Date().toISOString(),
        isMembership: false,
      },
      {
        confirmationCode: null,
        expirationDate: null,
        isConfirmed: true,
      },
      {
        recoveryCode: null,
        expirationDate: null,
      }
    );

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