import { MongoBlogModelWithId } from "../../models/blogs/MongoBlogModelWithId";

export const funcBlogsMapping = (array: MongoBlogModelWithId[]) => {
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