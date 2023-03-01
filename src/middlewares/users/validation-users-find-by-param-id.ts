import { param } from "express-validator";
import { ObjectId } from "mongodb";
import {
    blogsQueryRepository
} from "../../repositories/blogs/mongodb-blogs-query-repository";
import {
    usersQueryRepository
} from "../../repositories/users/mongodb-users-query-repository";

export const validationUsersFindByParamId = param("id").custom(
  async (value) => {
    const result = await usersQueryRepository.findUserById(new ObjectId(value));
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);