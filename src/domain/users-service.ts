import { ObjectId } from "mongodb";
import { UserViewModel } from "../models/view/UserViewModel";
import { usersRepository } from "../repositories/users-repository";
import bcrypt from "bcrypt";
import { UserDBModel } from "../models/database/UserDBModel";

class UsersService {
  async findUserById(_id: ObjectId): Promise<UserDBModel | null> {
    return usersRepository.findUserById(_id);
  }

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByLoginOrEmail(loginOrEmail);
  }

  async findUserByEmailConfirmationCode(
    code: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByEmailConfirmationCode(code);
  }

  async findUserByPasswordRecoveryCode(
    recoveryCode: string
  ): Promise<UserDBModel | null> {
    return usersRepository.findUserByPasswordRecoveryCode(recoveryCode);
  }

  async createUser(
    login: string,
    password: string,
    email: string
  ): Promise<UserViewModel> {
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
  }

  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user || !user.emailConfirmation.isConfirmed) {
      return false;
    }
    return bcrypt.compare(password, user.accountData.password);
  }

  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  }

  async deleteAll(): Promise<boolean> {
    return usersRepository.deleteAll();
  }
}

export const usersService = new UsersService();