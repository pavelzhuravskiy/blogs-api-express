import { body } from "express-validator";
import { usersQueryRepository } from "../../repositories/query-repos/mongodb-users-query-repository";

export const validationUserExistsByEmail = body("email").custom(async (value) => {
  const user = await usersQueryRepository.findUserByLoginOrEmail(value);
  if (!user) {
    throw new Error(
      "User with provided email not found"
    );
  }
  return true;
});