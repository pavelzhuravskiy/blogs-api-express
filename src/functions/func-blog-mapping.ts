import { MongoBlogModelWithId } from "../models/mongodb/MongoBlogModelWithId";

export const funcBlogMapping = (array: MongoBlogModelWithId[]) => {
  return array.map((blog) => {
    return {
      id: blog._id.toString(),
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
      createdAt: blog.createdAt,
      isMembership: blog.isMembership,
    };
  });
};