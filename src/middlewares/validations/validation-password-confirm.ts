import { body } from "express-validator";
import { UsersService } from "../../domain/users-service";
import { UsersRepository } from "../../repositories/users-repository";

const usersRepository = new UsersRepository();

const usersService = new UsersService(usersRepository);

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