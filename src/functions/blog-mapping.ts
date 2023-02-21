import { MongoBlogModelWithId } from "../models/mongodb/MongoBlogModel";

export const blogMapping = (array: MongoBlogModelWithId[]) => {
  return array.map((blog) => {
    return {
      pagesCount: 0,
      page: 0,
      pageSize: 0,
      totalCount: 0,
      items: {
        id: blog._id,
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
      },
    };
  });
};