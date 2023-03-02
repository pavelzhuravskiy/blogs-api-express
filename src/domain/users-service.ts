import { ObjectId } from "mongodb";
import {MongoUserModel} from "../models/users/MongoUserModel";
import {
  usersRepository
} from "../repositories/users/mongodb-users-repository";

export const usersService = {
  // Create new user
  async createNewUser(user: MongoUserModel): Promise<MongoUserModel> {
    const newUser = {
      ...user,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return usersRepository.createNewUser(newUser);
  },

  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  },

};