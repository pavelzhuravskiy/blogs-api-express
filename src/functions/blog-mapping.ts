import { MongoBlogModelWithId } from "../models/mongodb/MongoBlogModel";

export const blogMapping = (array: MongoBlogModelWithId[]) => {
  return array.map((el) => {
    return {
      id: el._id,
      name: el.name,
      description: el.description,
      websiteUrl: el.websiteUrl,
      createdAt: el.createdAt,
      isMembership: el.isMembership,
    };
  });
};