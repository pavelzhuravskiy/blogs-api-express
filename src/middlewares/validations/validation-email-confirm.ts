import { body } from "express-validator";
import { container } from "../../composition-root";
import { UsersService } from "../../domain/users-service";

const usersService = container.resolve(UsersService);

export const validationEmailConfirm = body("code").custom(async (value) => {
  const user = await usersService.findUserByEmailConfirmationCode(value);
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