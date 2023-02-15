import { Request } from "express";
import { blogsRepository } from "../repositories/memory/blogs-repository-memory";

export const blogNameFinder = async (req: Request) => {
  const blogs = await blogsRepository.findAllBlogs();
  const blogToFind = blogs.find((el) => el?.id === req.body.blogId);
  return blogToFind!.name;
};