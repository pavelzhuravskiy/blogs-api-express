import { body } from "express-validator";
import { usersRepository } from "../../repositories/users-repository";

export const validationPasswordConfirm = body("recoveryCode").custom(
  async (value) => {
    const user = await usersRepository.findUserByPasswordRecoveryCode(value);
    if (
      !user ||
      user.passwordRecovery.recoveryCode !== value ||
      user.passwordRecovery.expirationDate! < new Date()
    ) {
      throw new Error("Recovery code is incorrect");
    }
    return true;
  }
);