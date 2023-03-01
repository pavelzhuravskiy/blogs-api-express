import { blogsRepository } from "../repositories/blogs/mongodb-blogs-repository";
import { MongoBlogModel } from "../models/blogs/MongoBlogModel";
import { ObjectId } from "mongodb";
import {MongoUserModel} from "../models/users/MongoUserModel";
import {
  usersRepository
} from "../repositories/users/mongodb-users-repository";

export const usersService = {
  // Create new blog
  async createNewUser(user: MongoUserModel): Promise<MongoUserModel> {
    const newBlog = {
      ...user,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    return usersRepository.createNewUser(newBlog);
  },

  // // Update existing blog
  // async updateBlog(_id: ObjectId, blog: MongoBlogModel): Promise<boolean> {
  //   return blogsRepository.updateBlog(
  //     _id,
  //     blog.name,
  //     blog.description,
  //     blog.websiteUrl
  //   );
  // },
  //
  // Delete existing blog
  async deleteUser(_id: ObjectId): Promise<boolean> {
    return usersRepository.deleteUser(_id);
  },
  //
  // // Delete all blogs
  // async deleteAll(): Promise<boolean> {
  //   return blogsRepository.deleteAll();
  // },
};