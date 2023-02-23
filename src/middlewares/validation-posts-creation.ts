import { body } from "express-validator";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";

export const validationPostsCreation = body("blogId").custom(async (value) => {
  const result = await blogsService.findBlogById(new ObjectId(value));
  if (!result) {
    throw new Error("Blog with provided ID not found");
  }
  return true;
});