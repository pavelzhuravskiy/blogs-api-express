import { Request } from "express";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";
import { BlogViewModel } from "../models/BlogViewModel";

export const blogNameFinder = async (req: Request) => {
  let blogName;
  const blogs: BlogViewModel[] = await blogsRepositoryMemory.findAllBlogs();
  const foundBlog = blogs.find((blog) => blog?.id === req.body.blogId);
  if (foundBlog) {
    blogName = foundBlog.name;
    return blogName;
  } else {
    blogName = "123";
    return blogName;
  }
};