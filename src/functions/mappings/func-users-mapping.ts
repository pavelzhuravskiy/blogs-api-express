import { MongoUserModelWithPasswordWithId } from "../../models/users/MongoUserModelWithPasswordWithId";

export const funcUsersMapping = (array: MongoUserModelWithPasswordWithId[]) => {
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