import { MongoPostModelWithId } from "../models/mongodb/MongoPostModel";

export const postMapping = (array: MongoPostModelWithId[]) => {
  return array.map((el) => {
    return {
      id: el._id,
      title: el.title,
      shortDescription: el.shortDescription,
      content: el.content,
      blogId: el.blogId,
      blogName: el.blogName,
      createdAt: el.createdAt,
    };
  });
};