import { param } from "express-validator";
import { blogsService } from "../domain/blogs-service";
import { ObjectId } from "mongodb";

export const validationBlogsFindById = param("id").custom(async (value) => {
  const result = await blogsService.findBlogById(new ObjectId(value));
  if (!result) {
    throw new Error("ID not found");
  }
  return true;
});