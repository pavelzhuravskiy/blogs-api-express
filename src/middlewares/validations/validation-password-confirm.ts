import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const validationPasswordConfirm = body("code").custom(async (value) => {
  const user = await usersQueryRepository.findUserByPasswordConfirmationCode(value);
  if (
    !user ||
    user.passwordRecovery.confirmationCode !== value ||
    user.passwordRecovery.expirationDate! < new Date()
  ) {
    throw new Error("Confirmation code is incorrect");
  }
  return true;
});