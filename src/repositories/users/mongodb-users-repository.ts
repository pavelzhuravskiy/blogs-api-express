import {userCollection} from "../global/_mongodb-connect";
import { ObjectId } from "mongodb";
import {MongoUserModel} from "../../models/users/MongoUserModel";
import {
  MongoUserModelWithStringId
} from "../../models/users/MongoUserModelWithStringId";

export const usersRepository = {
  // Create new user
  async createNewUser(
    user: MongoUserModel
  ): Promise<MongoUserModelWithStringId> {
    const insertedUser = await userCollection.insertOne(user);

    return {
      id: insertedUser.insertedId.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  // // Update existing blog
  // async updateBlog(
  //   _id: ObjectId,
  //   name: string,
  //   description: string,
  //   websiteUrl: string
  // ): Promise<boolean> {
  //   const result = await blogsCollection.updateOne(
  //     { _id },
  //     {
  //       $set: {
  //         name: name,
  //         description: description,
  //         websiteUrl: websiteUrl,
  //       },
  //     }
  //   );
  //   return result.matchedCount === 1;
  // },
  //
  // Delete existing user
  async deleteUser(_id: ObjectId): Promise<boolean> {
    const result = await userCollection.deleteOne({ _id });
    return result.deletedCount === 1;
  },
  //
  // // Delete all blogs
  // async deleteAll(): Promise<boolean> {
  //   await blogsCollection.deleteMany({});
  //   return (await blogsCollection.countDocuments()) === 0;
  // },
};