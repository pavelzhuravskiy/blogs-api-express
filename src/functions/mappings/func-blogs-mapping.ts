import { BlogDBModel } from "../../models/database/BlogDBModel";

export const funcBlogsMapping = (array: BlogDBModel[]) => {
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