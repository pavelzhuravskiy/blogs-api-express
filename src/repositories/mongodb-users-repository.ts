import { usersCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { MongoUserModelWithStringId } from "../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPassword } from "../models/users/MongoUserModelWithPassword";

export const usersRepository = {
  // Create new user
  async createNewUser(
    user: MongoUserModelWithPassword
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