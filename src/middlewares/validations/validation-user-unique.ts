import { body } from "express-validator";
import { container } from "../../composition-root";
import { UsersService } from "../../domain/users-service";

const usersService = container.resolve(UsersService);

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersService.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });