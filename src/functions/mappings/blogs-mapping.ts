import { BlogDBModel } from "../../models/blogs/BlogDBModel";

export const blogsMapping = (array: BlogDBModel[]) => {
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