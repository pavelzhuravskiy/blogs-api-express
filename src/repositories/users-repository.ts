import { ObjectId } from "mongodb";
import { UserDBModel } from "../models/database/UserDBModel";
import { UserViewModel } from "../models/view/UserViewModel";
import { UserMongooseModel } from "../schemas/userSchema";
import { injectable } from "inversify";
import { HydratedDocument } from "mongoose";

@injectable()
export class UsersRepository {
  async findUserById(
    _id: ObjectId
  ): Promise<HydratedDocument<UserDBModel> | null> {
    const foundUser = await UserMongooseModel.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findUserByEmailConfirmationCode(
    code: string
  ): Promise<HydratedDocument<UserDBModel> | null> {
    const foundUser = await UserMongooseModel.findOne({
      "emailConfirmation.confirmationCode": code,
    });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async findUserByPasswordRecoveryCode(
    recoveryCode: string
  ): Promise<HydratedDocument<UserDBModel> | null> {
    const foundUser = await UserMongooseModel.findOne({
      "passwordRecovery.recoveryCode": recoveryCode,
    });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async createUser(user: UserDBModel): Promise<UserViewModel> {
    const insertedUser = await UserMongooseModel.create(user);

    return {
      id: insertedUser._id.toString(),
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt,
    };
  }

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<UserDBModel | null> {
    const foundUser = await UserMongooseModel.findOne({
      $or: [
        { "accountData.login": loginOrEmail },
        { "accountData.email": loginOrEmail },
      ],
    });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  }

  async deleteUser(_id: ObjectId): Promise<boolean> {
    const result = await UserMongooseModel.deleteOne({ _id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<boolean> {
    await UserMongooseModel.deleteMany({});
    return (await UserMongooseModel.countDocuments()) === 0;
  }

  async updateEmailConfirmationStatus(_id: ObjectId) {
    const result = await UserMongooseModel.updateOne(
      { _id },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    return result.modifiedCount === 1;
  }

  async updateEmailConfirmationCode(
    _id: ObjectId,
    newConfirmationCode: string
  ) {
    const result = await UserMongooseModel.updateOne(
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
    const result = await UserMongooseModel.updateOne(
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
    const result = await UserMongooseModel.updateOne(
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