import { Request } from "express";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";

export const blogNameFinder = async (req: Request) => {
  const blogs = await blogsRepository.findBlogs();
  const foundBlog = blogs.find((el) => el._id.toString() === req.body.blogId);
  return foundBlog!.name;
};