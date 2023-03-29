import { PostDBModel } from "../../models/database/PostDBModel";

export const funcPostsMapping = (array: PostDBModel[]) => {
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