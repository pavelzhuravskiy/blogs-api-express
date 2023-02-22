import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";
import { RequestWithBodyAndQuery } from "../models/global/GlobalRequestModel";
import { MongoBlogQueryModel } from "../models/mongodb/MongoBlogQueryModel";
import { MongoPostModelWithId } from "../models/mongodb/MongoPostModelWithId";

export const blogNameFinder = async (
  req: RequestWithBodyAndQuery<MongoPostModelWithId, MongoBlogQueryModel>
) => {
  const blogsObj = await blogsRepository.findBlogById(req.body._id);
  console.log(`Blogs object here ==> ${blogsObj}`);
  const foundBlog = blogsObj.items.find((blog) => blog.id === req.body.blogId);
  console.log(`FoundBlog here ==> ${foundBlog}`);
  console.log(`FoundBlog Name here ==> ${foundBlog!.name}`);
  return foundBlog!.name;
};