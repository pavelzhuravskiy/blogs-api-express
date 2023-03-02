import { ObjectId } from "mongodb";
import { MongoUserModel } from "../models/users/MongoUserModel";
import { usersRepository } from "../repositories/users/mongodb-users-repository";
import bcrypt from "bcrypt";

export const usersService = {
  // Create new user
  async createNewUser(
    login: string,
    password: string,
    email: string
  ): Promise<MongoUserModel> {
    const hash = bcrypt.hashSync(password, 10);
    const newUser = {
      login,
      password: hash,
      email,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return usersRepository.createNewUser(newUser);
  },

  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  },
};