import { Request } from "express";
import { blogsRepository } from "../repositories/blogs-repository";

export const blogNameFinder = (req: Request) => {
  let blogName;
  const blogToFind = blogsRepository
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