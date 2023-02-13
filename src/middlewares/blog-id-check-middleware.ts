import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";

export const blogIdCheckMiddleware = body("blogId").custom((value) => {
  const blogsArray = blogsRepository.findAllBlogs();
  const foundMatchId = blogsArray.filter(
    (id, index) => value === blogsArray[index].id
  );
  return foundMatchId.length > 0;
});