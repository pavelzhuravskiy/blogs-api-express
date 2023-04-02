import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { UsersQueryRepository } from "../../../repositories/query-repos/users-query-repository";

const usersQueryRepository = new UsersQueryRepository();

export const validationUsersFindByParamId = param("id").custom(
  async (value) => {
    const result = await usersQueryRepository.findUserById(new ObjectId(value));
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);