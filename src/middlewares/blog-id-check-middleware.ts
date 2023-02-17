import { body } from "express-validator";
import { blogsRepository } from "../repositories/mongodb/blogs-repository-mongodb";

export const blogIdCheckMiddleware = body("blogId").custom(async (value) => {
  const validBlogId = await blogsRepository.findAllBlogs();
  // @ts-ignore
  const isValid = validBlogId.filter((el) => el._id.toString() === value);
  if (isValid.length < 1) {
    throw new Error("Invalid blogId");
  }
  return true;
});