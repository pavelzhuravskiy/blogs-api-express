import { ObjectId } from "mongodb";
import { MongoUserModel } from "../models/users/MongoUserModel";
import { usersRepository } from "../repositories/mongodb-users-repository";
import bcrypt from "bcrypt";
import { usersQueryRepository } from "../repositories/mongodb-users-query-repository";

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

  // Credentials check
  async checkCredentials(
    loginOrEmail: string,
    password: string
  ): Promise<boolean> {
    const user = await usersQueryRepository.findUserByLoginOrEmail(
      loginOrEmail
    );
    if (!user) {
      return false;
    }
    return bcrypt.compareSync(password, user.password);
  },

  // Delete user by ID
  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  },

  // Delete all posts
  async deleteAll(): Promise<boolean> {
    return usersRepository.deleteAll();
  },
};