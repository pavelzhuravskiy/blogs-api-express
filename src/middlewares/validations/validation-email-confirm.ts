import { body } from "express-validator";
import { usersRepository } from "../../repositories/users-repository";

export const validationEmailConfirm = body("code").custom(async (value) => {
  const user = await usersRepository.findUserByEmailConfirmationCode(value);
  if (
    !user ||
    user.emailConfirmation.isConfirmed ||
    user.emailConfirmation.confirmationCode !== value ||
    user.emailConfirmation.expirationDate! < new Date()
  ) {
    throw new Error("Confirmation code is incorrect");
  }
  return true;
});