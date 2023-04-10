import { body } from "express-validator";
import { container } from "../../composition-root";
import { UsersService } from "../../domain/users-service";

const usersService = container.resolve(UsersService);

export const validationEmailResend = body("email").custom(async (value) => {
  const user = await usersService.findUserByLoginOrEmail(value);
  if (!user || user.emailConfirmation.isConfirmed) {
    throw new Error(
      "User with provided email not found or is already confirmed"
    );
  }
  return true;
});