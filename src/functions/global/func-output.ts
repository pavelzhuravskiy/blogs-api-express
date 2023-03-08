import { Document } from "mongodb";

export const funcOutput = async (
  pageNumber: number,
  pageSize: number,
  output: Function,
  collection: Document,
  mapping: Function,
  filter?: Document,
) => {
  const outputCount = await collection.countDocuments(filter);
  const pagesCount = Math.ceil(outputCount / pageSize);

  return {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize: pageSize,
    totalCount: outputCount,
    items: mapping(output),
  };
};