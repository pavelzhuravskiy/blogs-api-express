import { body } from "express-validator";
import { UsersService } from "../../domain/users-service";
import { UsersRepository } from "../../repositories/users-repository";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

export const validationUserUnique = (field: string) =>
  body(field).custom(async (value) => {
    const result = await usersService.findUserByLoginOrEmail(value);
    if (result) {
      throw new Error("User already registered");
    }
    return true;
  });