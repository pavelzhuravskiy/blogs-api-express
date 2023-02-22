import { body } from "express-validator";
import { blogsRepository } from "../repositories/mongodb/mongodb-blogs-repository";

export const blogIdCheckMiddleware = body("blogId").custom(async (value) => {
  const blogs = await blogsRepository.findBlogs(
    null,
    "name",
    "asc",
    0,
    0
  );
  const isValid = blogs.items.filter((el) => el.id === value);
  if (isValid.length < 1) {
    throw new Error("Invalid blogId");
  }
  return true;
});