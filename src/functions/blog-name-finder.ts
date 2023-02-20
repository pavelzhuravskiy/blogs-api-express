import { Request } from "express";
import { blogsRepository } from "../repositories/blogs-repository-mongodb";

export const blogNameFinder = async (req: Request) => {
  const blogs = await blogsRepository.findAllBlogs();
  const foundBlog = blogs.find((el) => el._id.toString() === req.body.blogId);
  return foundBlog!.name;
};