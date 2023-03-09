import { usersCollection } from "../_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcUserMapping } from "../../functions/mappings/func-user-mapping";
import { MongoUserModelWithStringId } from "../../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPagination } from "../../models/users/MongoUserModelWithPagination";
import { funcFilter } from "../../functions/global/func-filter";
import { funcPagination } from "../../functions/global/func-pagination";
import { funcSorting } from "../../functions/global/func-sorting";
import { funcOutput } from "../../functions/global/func-output";
import { MongoUserModelWithId } from "../../models/users/MongoUserModelWithId";
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
      searchLoginTerm,
      searchEmailTerm
    );

    // Pagination
    const usersPagination = await funcPagination(
      await funcSorting(sortBy, sortDirection),
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
      funcUserMapping,
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
      email: foundUser.email,
      login: foundUser.login,
      createdAt: foundUser.createdAt,
    };
  },

  // Return user with string ID
  async findUserByIdWithMongoId(
    _id: ObjectId
  ): Promise<MongoUserModelWithId | null> {
    const foundUser = await usersCollection.findOne({ _id });

    if (!foundUser) {
      return null;
    }

    return foundUser;
  },

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<MongoUserModelWithPasswordWithId | null> {
    return await usersCollection.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
  },
};