import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";

export const blogIdCheckMiddleware = body("blogId").custom((value, { req }) => {
  const blogsArray = blogsRepository.findAllBlogs();
  const blogIdToFind = req.body.blogId;
  const foundMatchId = blogsArray.filter(
    (id, index) => blogIdToFind === blogsArray[index].id
  );
  return foundMatchId.length > 0;
});