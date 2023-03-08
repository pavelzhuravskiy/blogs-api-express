import { Sort } from "mongodb";

export const funcSorting = async (
  sortBy: string = "createdAt",
  sortDirection: string = "desc"
) => {
  const sortingObj: Sort = {};

  if (sortBy) {
    sortingObj[sortBy] = -1;
  }

  if (sortDirection === "asc") {
    sortingObj[sortBy] = 1;
  }

  return sortingObj;
};