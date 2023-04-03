import { ObjectId } from "mongodb";
import { funcUsersMapping } from "../../functions/mappings/func-users-mapping";
import { UserDBModel } from "../../models/database/UserDBModel";
import { Paginator } from "../../models/view/_Paginator";
import { UserViewModel } from "../../models/view/UserViewModel";
import { Users } from "../../schemas/userSchema";
import { FilterQuery, SortOrder } from "mongoose";

export class UsersQueryRepository {
  async findUsers(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    searchLoginTerm?: string,
    searchEmailTerm?: string
  ): Promise<Paginator<UserViewModel[]>> {
    const filter: FilterQuery<UserDBModel> = {};

    if (searchLoginTerm || searchEmailTerm) {
      filter.$or = [];

      if (searchLoginTerm) {
        filter.$or.push({
          "accountData.login": { $regex: searchLoginTerm, $options: "i" },
        });
      }

      if (searchEmailTerm) {
        filter.$or.push({
          "accountData.email": { $regex: searchEmailTerm, $options: "i" },
        });
      }
    }

    const sortingObj: { [key: string]: SortOrder } = {
      [`accountData.${sortBy}`]: "desc",
    };

    if (sortDirection === "asc") {
      sortingObj[`accountData.${sortBy}`] = "asc";
    }

    const output = await Users.find(filter)
      .sort(sortingObj)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : 0);

    const totalCount = await Users.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / pageSize);

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: funcUsersMapping(output),
    };
  }

  async findUserById(_id: ObjectId): Promise<UserViewModel | null> {
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
  }
}