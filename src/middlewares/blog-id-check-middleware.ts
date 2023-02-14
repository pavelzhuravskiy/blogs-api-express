import { body } from "express-validator";
import { blogsRepositoryMemory } from "../repositories/memory/blogs-repository-memory";

export const blogIdCheckMiddleware = body("blogId").custom(async (value) => {
  const blogsArray = await blogsRepositoryMemory.findAllBlogs();
  const foundMatchId = blogsArray.filter(
    (id, index) => value === blogsArray[index]?.id
  );
  return foundMatchId.length > 0;
});