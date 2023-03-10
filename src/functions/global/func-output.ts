import { Document } from "mongodb";

export const funcOutput = async (
  pageNumber: number,
  pageSize: number,
  output: Function,
  collection: Document,
  mapping: Function,
  filter?: Document
) => {
  const totalCount = await collection.countDocuments(filter);
  const pagesCount = Math.ceil(totalCount / pageSize);

  return {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize: pageSize,
    totalCount,
    items: mapping(output),
  };
};