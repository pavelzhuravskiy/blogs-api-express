import { body } from "express-validator";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";

export const blogIdCheckMiddleware = body("blogId").custom((value) => {
  const blogsArray = blogsRepositoryMemory.findAllBlogs();
  const foundMatchId = blogsArray.filter(
    (id, index) => value === blogsArray[index].id
  );
  return foundMatchId.length > 0;
});