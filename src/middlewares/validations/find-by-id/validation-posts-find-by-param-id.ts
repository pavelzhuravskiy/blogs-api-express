import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { container } from "../../../composition-root";
import { PostsQueryRepository } from "../../../repositories/query-repos/posts-query-repository";

const postsQueryRepository = container.resolve(PostsQueryRepository);

export const validationPostsFindByParamId = param("id").custom(
  async (value) => {
    const result = await postsQueryRepository.findPostById(new ObjectId(value));
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);