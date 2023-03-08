import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { commentsQueryRepository } from "../../repositories/mongodb-comments-query-repository";

export const validationCommentsFindByParamId = /*(repo) =>*/ param("id").custom(
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