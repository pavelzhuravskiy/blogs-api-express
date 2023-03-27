import { usersCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { MongoUserModelWithStringId } from "../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPasswordWithId } from "../models/users/MongoUserModelWithPasswordWithId";

export const usersRepository = {
  // Create new user
  async createUser(
    user: MongoUserModelWithPasswordWithId
  ): Promise<MongoUserModelWithStringId> {
    const insertedUser = await usersCollection.insertOne(user);

    return {
      id: insertedUser.insertedId.toString(),
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt,
    };
  },

  // Delete existing user
  async deleteUser(_id: ObjectId): Promise<boolean> {
    const result = await usersCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all users
  async deleteAll(): Promise<boolean> {
    await usersCollection.deleteMany({});
    return (await usersCollection.countDocuments()) === 0;
  },

  // Update user confirmation status
  async updateEmailConfirmationStatus(_id: ObjectId) {
    const result = await usersCollection.updateOne(
      { _id },
      { $set: { "emailConfirmation.isConfirmed": true } }
    );
    return result.modifiedCount === 1;
  },

  // Update confirmation code
  async updateEmailConfirmationCode(
    _id: ObjectId,
    newConfirmationCode: string
  ) {
    const result = await usersCollection.updateOne(
      { _id },
      { $set: { "emailConfirmation.confirmationCode": newConfirmationCode } }
    );
    return result.modifiedCount === 1;
  },

  // Update password recovery confirmation data
  async updatePasswordConfirmationData(
    _id: ObjectId,
    confirmationCode: string,
    expirationDate: Date
  ) {
    const result = await usersCollection.updateOne(
      { _id },
      {
        $set: {
          "passwordConfirmation.confirmationCode": confirmationCode,
          "passwordConfirmation.expirationDate": expirationDate,
        },
      }
    );
    return result.modifiedCount === 1;
  },

  // Update password recovery confirmation data
  async updatePassword(
      _id: ObjectId,
      hash: string,
  ) {
    const result = await usersCollection.updateOne(
        { _id },
        {
          $set: {
            "accountData.password": hash,
            "passwordConfirmation.confirmationCode": null,
            "passwordConfirmation.expirationDate": null,
          },
        }
    );
    return result.modifiedCount === 1;
  },

};