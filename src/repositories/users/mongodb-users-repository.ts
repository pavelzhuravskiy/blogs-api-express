import { userCollection } from "../global/_mongodb-connect";
import { ObjectId } from "mongodb";
import { MongoUserModelWithStringId } from "../../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPassword } from "../../models/users/MongoUserModelWithPassword";

export const usersRepository = {
  // Create new user
  async createNewUser(
    user: MongoUserModelWithPassword
  ): Promise<MongoUserModelWithStringId> {
    const insertedUser = await userCollection.insertOne(user);

    return {
      id: insertedUser.insertedId.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  // Delete existing user
  async deleteUser(_id: ObjectId): Promise<boolean> {
    const result = await userCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },

  // Delete all users
  async deleteAll(): Promise<boolean> {
    await userCollection.deleteMany({});
    return (await userCollection.countDocuments()) === 0;
  },
};