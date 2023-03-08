import { usersCollection } from "./_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcUserMapping } from "../functions/mappings/func-user-mapping";
import { MongoUserModelWithStringId } from "../models/users/MongoUserModelWithStringId";
import { MongoUserModelWithPagination } from "../models/users/MongoUserModelWithPagination";
import { MongoUserModelWithPassword } from "../models/users/MongoUserModelWithPassword";
import { funcFilter } from "../functions/global/func-filter";
import { funcPagination } from "../functions/global/func-pagination";
import { funcSorting } from "../functions/global/func-sorting";
import { funcOutput } from "../functions/global/func-output";

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

  // Return user by ID
  async findUserById(
    _id: ObjectId
  ): Promise<false | MongoUserModelWithStringId> {
    const foundUser = await usersCollection.findOne({ _id });

    if (!foundUser) {
      return false;
    }

    return {
      id: foundUser._id.toString(),
      email: foundUser.email,
      login: foundUser.login,
      createdAt: foundUser.createdAt,
    };
  },

  async findUserByLoginOrEmail(
    loginOrEmail: string
  ): Promise<MongoUserModelWithPassword | null> {
    return await usersCollection.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });
  },
};