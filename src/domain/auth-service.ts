import { emailManager } from "../managers/email-manager";
import { UserViewModel } from "../models/view/UserViewModel";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { UsersRepository } from "../repositories/users-repository";
import { UsersService } from "./users-service";
import { UserDBModel } from "../models/database/UserDBModel";

export class AuthService {
  private usersService: UsersService;
  private usersRepository: UsersRepository;
  constructor() {
    this.usersService = new UsersService();
    this.usersRepository = new UsersRepository();
  }
  async registerUser(
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
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: false,
      },
      {
        recoveryCode: null,
        expirationDate: null,
      }
    );

    const createResult = await this.usersRepository.createUser(newUser);
    try {
      await emailManager.sendRegistrationEmail(
        newUser.accountData.email,
        newUser.emailConfirmation.confirmationCode!
      );
    } catch (error) {
      console.error(error);
      await this.usersRepository.deleteUser(newUser._id);
      return null;
    }
    return createResult;
  }

  async confirmEmail(code: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmailConfirmationCode(code);
    if (!user) {
      return false;
    }
    return this.usersRepository.updateEmailConfirmationStatus(user._id);
  }

  async resendEmail(email: string): Promise<boolean> {
    const user = await this.usersService.findUserByLoginOrEmail(email);
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
    return this.usersRepository.updateEmailConfirmationCode(
      user._id,
      newConfirmationCode
    );
  }

  async sendPasswordRecoveryCode(email: string): Promise<boolean> {
    const user = await this.usersService.findUserByLoginOrEmail(email);

    if (!user) {
      return false;
    }

    const userId = user._id;
    const recoveryCode = randomUUID();
    const expirationDate = add(new Date(), {
      hours: 1,
    });

    const updateResult = await this.usersRepository.updatePasswordRecoveryData(
      userId,
      recoveryCode,
      expirationDate
    );

    try {
      await emailManager.sendChangePasswordEmail(email, recoveryCode);
    } catch (error) {
      console.error(error);
      return false;
    }

    return updateResult;
  }

  async changePassword(
    recoveryCode: string,
    password: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.findUserByPasswordRecoveryCode(
      recoveryCode
    );
    if (!user) {
      return false;
    }
    return this.usersRepository.updatePassword(user._id, hash);
  }
}