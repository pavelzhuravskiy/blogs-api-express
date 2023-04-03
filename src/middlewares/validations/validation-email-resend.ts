import { body } from "express-validator";
import { UsersService } from "../../domain/users-service";
import { UsersRepository } from "../../repositories/users-repository";

const usersRepository = new UsersRepository();

const usersService = new UsersService(usersRepository);

export const validationEmailResend = body("email").custom(async (value) => {
  const user = await usersService.findUserByLoginOrEmail(value);
  if (!user || user.emailConfirmation.isConfirmed) {
    throw new Error(
      "User with provided email not found or is already confirmed"
    );
  }
  return true;
});