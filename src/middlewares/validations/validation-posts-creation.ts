import { body } from "express-validator";
import { ObjectId } from "mongodb";
import { BlogsQueryRepository } from "../../repositories/query-repos/blogs-query-repository";

const blogsQueryRepository = new BlogsQueryRepository();

export const validationPostsCreation = body("blogId").custom(async (value) => {
  const result = await blogsQueryRepository.findBlogById(new ObjectId(value));
  if (!result) {
    throw new Error("Blog with provided ID not found");
  }
  return true;
});