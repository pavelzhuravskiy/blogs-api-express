import {MongoPostModelWithId} from "../models/mongodb/MongoPostModelWithId";

export const postMapping = (array: MongoPostModelWithId[]) => {
  return array.map((post) => {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt,
    };
  });
};