import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { CommentsQueryRepository } from "../../../repositories/query-repos/comments-query-repository";

const commentsQueryRepository = new CommentsQueryRepository();

export const validationCommentsFindByParamId = param("id").custom(
  async (value) => {
    const result = await commentsQueryRepository.findCommentById(
      new ObjectId(value)
    );
    if (!result) {
      throw new Error("ID not found");
    }
    return true;
  }
);