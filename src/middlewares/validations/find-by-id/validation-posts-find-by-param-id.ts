import { param } from "express-validator";
import { container } from "../../../composition-root";
import { PostsQueryRepository } from "../../../repositories/query-repos/posts-query-repository";

const postsQueryRepository = container.resolve(PostsQueryRepository);

export const validationPostsFindByParamId = param("id").custom(
  async (value) => {
    const result = await postsQueryRepository.findPostById(value);
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);