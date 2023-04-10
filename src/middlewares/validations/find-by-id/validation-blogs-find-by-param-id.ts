import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { container } from "../../../composition-root";
import { BlogsQueryRepository } from "../../../repositories/query-repos/blogs-query-repository";

const blogsQueryRepository = container.resolve(BlogsQueryRepository);

export const validationBlogsFindByParamId = param("id").custom(
  async (value) => {
    const result = await blogsQueryRepository.findBlogById(new ObjectId(value));
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);