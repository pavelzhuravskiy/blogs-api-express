import { body } from "express-validator";
import { usersService } from "../../domain/users-service";

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersService.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });