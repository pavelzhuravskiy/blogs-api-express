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
};