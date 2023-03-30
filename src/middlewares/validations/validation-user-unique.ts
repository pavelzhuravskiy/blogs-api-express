import { body } from "express-validator";
import { usersRepository } from "../../repositories/users-repository";

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersRepository.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });