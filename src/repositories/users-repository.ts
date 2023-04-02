import { ObjectId } from "mongodb";
import { UserDBModel } from "../models/database/UserDBModel";
import { UserViewModel } from "../models/view/UserViewModel";
import { Users } from "../schemas/userSchema";

class UsersRepository {
  async findUserById(_id: ObjectId): Promise<UserDBModel | null> {
    const foundUser = await Users.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findUserByLoginOrEmail(
      loginOrEmail: string
  ): Promise<UserDBModel | null> {
    const foundUser = await Users.findOne({
      $or: [
        { "accountData.login": loginOrEmail },
        { "accountData.email": loginOrEmail },
      ],
    });

    if (!foundUser) {
      return null
    }

    return foundUser

  }

  async findUserByEmailConfirmationCode(code: string): Promise<UserDBModel | null> {
    const foundUser = await Users.findOne({
      "emailConfirmation.confirmationCode": code,
    });

    if (!foundUser) {
      return null
    }

    return foundUser

  }

  async findUserByPasswordRecoveryCode(recoveryCode: string): Promise<UserDBModel | null> {
    const foundUser = await Users.findOne({
      "passwordRecovery.recoveryCode": recoveryCode,
    });

    if (!foundUser) {
      return null
    }

    return foundUser
  }

  async createUser(user: UserDBModel): Promise<UserViewModel> {
    const insertedUser = await Users.create(user);

    return {
      id: insertedUser._id.toString(),
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt,
    };
  }

  async deleteUser(_id: ObjectId): Promise<boolean> {
    const result = await Users.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await Users.deleteMany({});
    return (await Users.countDocuments()) === 0;
  }

  async updateEmailConfirmationStatus(_id: ObjectId) {
    const result = await Users.updateOne(
        { _id },
        { $set: { "emailConfirmation.isConfirmed": true } }
    );
    return result.modifiedCount === 1;
  }

  async updateEmailConfirmationCode(
      _id: ObjectId,
      newConfirmationCode: string
  ) {
    const result = await Users.updateOne(
        { _id },
        { $set: { "emailConfirmation.confirmationCode": newConfirmationCode } }
    );
    return result.modifiedCount === 1;
  }

  async updatePasswordRecoveryData(
      _id: ObjectId,
      recoveryCode: string,
      expirationDate: Date
  ) {
    const result = await Users.updateOne(
        { _id },
        {
          $set: {
            "passwordRecovery.recoveryCode": recoveryCode,
            "passwordRecovery.expirationDate": expirationDate,
          },
        }
    );
    return result.modifiedCount === 1;
  }

  async updatePassword(_id: ObjectId, hash: string) {
    const result = await Users.updateOne(
        { _id },
        {
          $set: {
            "accountData.password": hash,
            "passwordRecovery.recoveryCode": null,
            "passwordRecovery.expirationDate": null,
          },
        }
    );
    return result.modifiedCount === 1;
  }

}

export const usersRepository = new UsersRepository();