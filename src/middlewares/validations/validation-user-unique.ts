import { body } from "express-validator";
import { usersService } from "../../composition-root";

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersService.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });