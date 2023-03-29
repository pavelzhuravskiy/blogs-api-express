import { UserDBModel } from "../../models/UserDBModel";

export const funcUsersMapping = (array: UserDBModel[]) => {
  return array.map((user) => {
    // return user
    return {
      id: user._id.toString(),
      login: user.accountData.login,
      email: user.accountData.email,
      createdAt: user.accountData.createdAt,
    };
  });
};