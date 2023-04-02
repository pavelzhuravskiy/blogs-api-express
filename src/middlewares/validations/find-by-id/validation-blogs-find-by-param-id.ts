import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { BlogsQueryRepository } from "../../../repositories/query-repos/blogs-query-repository";

const blogsQueryRepository = new BlogsQueryRepository();

export const validationBlogsFindByParamId = param("id").custom(
  async (value) => {
    const result = await blogsQueryRepository.findBlogById(new ObjectId(value));
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);