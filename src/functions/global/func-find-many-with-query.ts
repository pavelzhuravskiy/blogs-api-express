import { funcPagination } from "./func-pagination";
import { Document, ObjectId, Sort } from "mongodb";

export const funcFindManyWithQuery = async (
  blogId: null | ObjectId = null,
  searchNameTerm: null | string = null,
  searchLoginTerm: null | string = null,
  searchEmailTerm: null | string = null,
  sortBy: string = "createdAt",
  sortDirection: string = "desc",
  pageNumber: number = 1,
  pageSize: number = 10,
  collection: Document,
  mapping: Function
) => {
  const filter: Document = {};

  const sortingObj: Sort = {};

  if (blogId) {
    filter.blogId = blogId.toString();
  }

  if (searchNameTerm) {
    filter.name = { $regex: searchNameTerm, $options: "i" };
  }

  if (searchLoginTerm || searchEmailTerm) {
    filter.$or = [];

    if (searchLoginTerm) {
      filter.$or.push({ login: { $regex: searchLoginTerm, $options: "i" } });
    }

    if (searchEmailTerm) {
      filter.$or.push({ email: { $regex: searchEmailTerm, $options: "i" } });
    }
  }

  if (sortBy) {
    sortingObj[sortBy] = -1;
  }

  if (sortDirection === "asc") {
    sortingObj[sortBy] = 1;
  }

  const output = await funcPagination(
    filter,
    sortingObj,
    pageNumber,
    pageSize,
    collection
  );
  const outputCount = await collection.countDocuments(filter);
  const pagesCount = Math.ceil(outputCount / +pageSize);

  return {
    pagesCount: pagesCount,
    page: +pageNumber,
    pageSize: +pageSize,
    totalCount: outputCount,
    items: mapping(output),
  };
};