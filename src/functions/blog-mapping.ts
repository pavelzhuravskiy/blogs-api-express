import { BlogMongoModelNoId } from "../models/BlogMongoModelNoId";

export const blogMapping = (array: Array<BlogMongoModelNoId>) => {
  return array.map((el) => {
    return {
      // @ts-ignore
      id: el._id,
      name: el.name,
      description: el.description,
      websiteUrl: el.websiteUrl,
      createdAt: el.createdAt,
      isMembership: el.isMembership,
    };
  });
};