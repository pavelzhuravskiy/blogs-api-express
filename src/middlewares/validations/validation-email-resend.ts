import { body } from "express-validator";
import { usersRepository } from "../../repositories/users-repository";

export const validationEmailResend = body("email").custom(async (value) => {
  const user = await usersRepository.findUserByLoginOrEmail(value);
  if (!user || user.emailConfirmation.isConfirmed) {
    throw new Error(
      "User with provided email not found or is already confirmed"
    );
  }
  return true;
});