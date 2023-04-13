import { param } from "express-validator";
import { container } from "../../../composition-root";
import { UsersQueryRepository } from "../../../repositories/query-repos/users-query-repository";

const usersQueryRepository = container.resolve(UsersQueryRepository);

export const validationUsersFindByParamId = param("id").custom(
  async (value) => {
    const result = await usersQueryRepository.findUserById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);