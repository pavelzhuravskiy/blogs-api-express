import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { RequestWithBodyAndQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModel";

export const blogNameFinder = async (
  req: RequestWithBodyAndQuery<MongoPostModelWithId, MongoBlogQueryModel>
) => {
  const blogs = await blogsRepository.findBlogs(
    req.query.searchNameTerm,
    req.query.sortBy,
    req.query.sortDirection
  );
  const foundBlog = blogs.find((el) => el._id.toString() === req.body.blogId);
  return foundBlog!.name;
};