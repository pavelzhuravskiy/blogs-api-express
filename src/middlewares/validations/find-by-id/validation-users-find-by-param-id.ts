import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { usersQueryRepository } from "../../../repositories/users-query-repository";

export const validationUsersFindByParamId = param("id").custom(
  async (value) => {
    const result = await usersQueryRepository.findUserByIdReturnViewModel(
      new ObjectId(value)
    );
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);