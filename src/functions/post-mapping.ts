import { PostMongoModelNoId } from "../models/PostMongoModelNoId";

export const postMapping = (array: Array<PostMongoModelNoId>) => {
  return array.map((el) => {
    return {
      // @ts-ignore
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