import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const validationPasswordConfirm = body("code").custom(async (value) => {
  const user = await usersQueryRepository.findUserByPasswordConfirmationCode(value);
  if (
    !user ||
    user.passwordConfirmation.confirmationCode !== value ||
    user.passwordConfirmation.expirationDate! < new Date()
  ) {
    throw new Error("Confirmation code is incorrect");
  }
  return true;
});