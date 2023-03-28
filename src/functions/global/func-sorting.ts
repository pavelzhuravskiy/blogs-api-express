import {SortOrder} from "mongoose";

export const funcSorting = async (
  sortBy: string = "createdAt",
  sortDirection: string = "desc"
) => {
  const sortingObj: { [key: string]: SortOrder } = {};

  if (sortBy) {
    sortingObj[sortBy] = -1;
  }

  if (sortDirection === "asc") {
    sortingObj[sortBy] = 1;
  }

  console.log(sortingObj);

  return sortingObj;
};