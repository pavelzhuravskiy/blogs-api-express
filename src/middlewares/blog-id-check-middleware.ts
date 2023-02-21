import { body } from "express-validator";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";

export const blogIdCheckMiddleware = body("blogId").custom(async (value) => {
  const validBlogId = await blogsRepository.findBlogs();
  const isValid = validBlogId.filter((el) => el._id.toString() === value);
  if (isValid.length < 1) {
    throw new Error("Invalid blogId");
  }
  return true;
});