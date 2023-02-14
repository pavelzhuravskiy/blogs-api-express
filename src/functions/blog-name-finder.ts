import { Request } from "express";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";

export const blogNameFinder = (req: Request) => {
  let blogName;
  const blogToFind = blogsRepositoryMemory
    .findAllBlogs()
    .find((blog) => blog.id === req.body.blogId);
  if (blogToFind) {
    blogName = blogToFind.name;
    return blogName;
  } else {
    blogName = "123";
    return blogName;
  }
};