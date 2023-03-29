import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/users-query-repository";

export const validationPasswordConfirm = body("recoveryCode").custom(async (value) => {
  const user = await usersQueryRepository.findUserByPasswordRecoveryCode(value);
  if (
    !user ||
    user.passwordRecovery.recoveryCode !== value ||
    user.passwordRecovery.expirationDate! < new Date()
  ) {
    throw new Error("Recovery code is incorrect");
  }
  return true;
});