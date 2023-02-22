import { body } from "express-validator";
import { postsService } from "../domain/posts-service";

export const validationPostsCreation = body("blogId").custom(
  async (value, { req }) => {
    const result = await postsService.createNewPost(req.body);
    if (!result) {
      throw new Error("Blog with provided ID not found");
    }
    return true;
  }
);