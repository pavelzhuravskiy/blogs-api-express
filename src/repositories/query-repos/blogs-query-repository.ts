import { ObjectId } from "mongodb";
import { BlogViewModel } from "../../models/view/BlogViewModel";
import { Paginator } from "../../models/view/_Paginator";
import { Blogs } from "../../schemas/blogSchema";
import { funcBlogsMapping } from "../../functions/mappings/func-blogs-mapping";
import { BlogDBModel } from "../../models/database/BlogDBModel";
import { FilterQuery, SortOrder } from "mongoose";

export const blogsQueryRepository = {
  // Return blogs with query
  async findBlogs(
    pageNumber: number,
    pageSize: number,
    sortBy: string = "createdAt",
    sortDirection: SortOrder,
    searchNameTerm?: string
  ): Promise<Paginator<BlogViewModel[]>> {
    const filter: FilterQuery<BlogDBModel> = {};

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: "i" };
    }

    const sortingObj: { [key: string]: SortOrder } = {[sortBy]: "desc"};

    if (sortDirection === "asc") {
      sortingObj[sortBy] = "asc"
    }

    const output = await Blogs.find(filter)
      .sort(sortingObj)
      .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
      .limit(pageSize > 0 ? pageSize : 0);

    const totalCount = await Blogs.countDocuments(filter);
    const pagesCount = Math.ceil(totalCount / Number(pageSize));

    return {
      pagesCount: pagesCount,
      page: pageNumber,
      pageSize: pageSize,
      totalCount,
      items: funcBlogsMapping(output),
    };
  },

  // Return blog by ID
  async findBlogById(_id: ObjectId): Promise<BlogViewModel | null> {
    const foundBlog = await Blogs.findOne({ _id });

    if (!foundBlog) {
      return null;
    }

    return {
      id: foundBlog._id.toString(),
      name: foundBlog.name,
      description: foundBlog.description,
      websiteUrl: foundBlog.websiteUrl,
      createdAt: foundBlog.createdAt,
      isMembership: foundBlog.isMembership,
    };
  },
};