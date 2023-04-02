import { body } from "express-validator";
import { UsersService } from "../../domain/users-service";

const usersService = new UsersService();

export const validationPasswordConfirm = body("recoveryCode").custom(
  async (value) => {
    const user = await usersService.findUserByPasswordRecoveryCode(value);
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