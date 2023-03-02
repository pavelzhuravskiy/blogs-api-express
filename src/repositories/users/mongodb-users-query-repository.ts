import { userCollection } from "../global/_mongodb-connect";
import { ObjectId } from "mongodb";
import { funcFindWithQuery } from "../../functions/global/func-find-with-query";
import { funcUserMapping } from "../../functions/users/func-user-mapping";
import { MongoUserModelWithStringId } from "../../models/users/MongoUserModelWithStringId";
import {
  MongoUserModelWithPagination
} from "../../models/users/MongoUserModelWithPagination";

export const usersQueryRepository = {
  // Return users with query
  async findUsers(
    searchLoginTerm: null | string,
    searchEmailTerm: null | string,
    sortBy: string,
    sortDirection: string,
    pageNumber: number,
    pageSize: number
  ): Promise<MongoUserModelWithPagination> {
    return funcFindWithQuery(
      undefined,
      undefined,
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
      userCollection,
      funcUserMapping
    );
  },

  // Return user by ID
  async findUserById(
    _id: ObjectId
  ): Promise<false | MongoUserModelWithStringId> {
    const foundUser = await userCollection.findOne({ _id });

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
};