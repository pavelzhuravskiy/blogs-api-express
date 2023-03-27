import { usersCollection } from "../_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcUsersMapping } from "../../functions/mappings/func-users-mapping";
import { MongoUserModelWithStringId } from "../../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPagination } from "../../models/users/MongoUserModelWithPagination";
import { funcFilter } from "../../functions/global/func-filter";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { MongoUserModelWithPasswordWithId } from "../../models/users/MongoUserModelWithPasswordWithId";

export const usersQueryRepository = {
  // Return users with query
  async findUsers(
    searchLoginTerm: string,
    searchEmailTerm: string,
    sortBy: string,
    sortDirection: string,
    pageNumber: string,
    pageSize: string
  ): Promise<MongoUserModelWithPagination> {
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
      usersCollection,
      usersFilter
    );

    // Output
    return funcOutput(
      Number(pageNumber) || 1,
      Number(pageSize) || 10,
      usersPagination,
      usersCollection,
      funcUsersMapping,
      usersFilter
    );
  },

  // Return user with string ID
  async findUserByIdWithStringId(
    _id: ObjectId
  ): Promise<MongoUserModelWithStringId | null> {
    const foundUser = await usersCollection.findOne({ _id });

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

  async findUserByIdWithMongoId(
    _id: ObjectId
  ): Promise<MongoUserModelWithPasswordWithId | null> {
    const foundUser = await usersCollection.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  },

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<MongoUserModelWithPasswordWithId | null> {
    return usersCollection.findOne({
      $or: [
        { "accountData.login": loginOrEmail },
        { "accountData.email": loginOrEmail },
      ],
    });
  },

  async findUserByEmailConfirmationCode(code: string) {
    return usersCollection.findOne({
      "emailConfirmation.confirmationCode": code,
    });
  },

  async findUserByPasswordConfirmationCode(code: string) {
    return usersCollection.findOne({
      "passwordRecovery.confirmationCode": code,
    });
  },
};