import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/users/mongodb-users-query-repository";

export const validationUserUniqueLogin = body("login").custom(async (value) => {
  const result = await usersQueryRepository.findUserByLoginOrEmail(value);
  if (result) {
    throw new Error("User already registered");
  }
  return true;
});