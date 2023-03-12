import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const validationEmailConfirm = body("code").custom(async (value) => {
  const user = await usersQueryRepository.findUserByCode(value);
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