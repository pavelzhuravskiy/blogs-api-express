import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersQueryRepository.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });