import { ObjectId } from "mongodb";
import { funcUsersMapping } from "../../functions/mappings/func-users-mapping";
import { funcFilter } from "../../functions/global/func-filter";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { UserDBModel } from "../../models/database/UserDBModel";
import { Paginator } from "../../models/global/Paginator";
import { UserViewModel } from "../../models/view/UserViewModel";
import { Users } from "../../schemas/userSchema";

export const usersQueryRepository = {
  // Return users with query
  async findUsers(
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string
  ): Promise<Paginator<UserViewModel[]>> {
    // Filter
    const usersFilter = await funcFilter(
      undefined,
      undefined,
      undefined,
      searchLoginTerm,
      searchEmailTerm
    );

    // Pagination
    const usersSortingField = sortBy
      ? `accountData.${sortBy}`
      : `accountData.createdAt`;
    const usersPagination = await funcPagination(
      await funcSorting(usersSortingField, sortDirection),
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      Users,
      usersFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      usersPagination,
      Users,
      funcUsersMapping,
      usersFilter
    );
  },

  // Return user with string ID
  async findUserByIdReturnViewModel(_id: ObjectId): Promise<UserViewModel | null> {
    const foundUser = await Users.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return {
      id: foundUser._id.toString(),
      email: foundUser.accountData.email,
      login: foundUser.accountData.login,
      createdAt: foundUser.accountData.createdAt,
    };
  },

  async findUserByIdReturnDBModel(_id: ObjectId): Promise<UserDBModel | null> {
    const foundUser = await Users.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  },

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<UserDBModel | null> {
    return Users.findOne({
      $or: [
        { "accountData.login": loginOrEmail },
        { "accountData.email": loginOrEmail },
      ],
    });
  },

  async findUserByEmailConfirmationCode(code: string) {
    return Users.findOne({
      "emailConfirmation.confirmationCode": code,
    });
  },

  async findUserByPasswordRecoveryCode(recoveryCode: string) {
    return Users.findOne({
      "passwordRecovery.recoveryCode": recoveryCode,
    });
  },
};