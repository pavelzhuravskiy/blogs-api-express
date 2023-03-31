import { Router } from "express";
import { authBasic } from "../middlewares/auth/auth-basic";
import { validationPostsInput } from "../middlewares/validations/input/validation-posts-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationPostsCreation } from "../middlewares/validations/validation-posts-creation";
import { validationPostsFindByParamId } from "../middlewares/validations/find-by-id/validation-posts-find-by-param-id";
import { ValidationCommentsInput } from "../middlewares/validations/input/validation-comments-input";
import { authBearer } from "../middlewares/auth/auth-bearer";
import { postsController } from "../controllers/PostsController";

export const postsRouter = Router({});

postsRouter.post(
  "/",
  authBasic,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  postsController.createPost
);

postsRouter.get("/", postsController.getPosts);

postsRouter.get(
  "/:id",
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.getPost
);

postsRouter.put(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  postsController.updatePost
);

postsRouter.delete(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.deletePost
);

postsRouter.delete("/", authBasic, postsController.deletePosts);

// +++++ Comments section start +++++

postsRouter.post(
  "/:id/comments",
  authBearer,
  validationPostsFindByParamId,
  ValidationCommentsInput,
  validationErrorCheck,
  postsController.createComment
);

postsRouter.get(
  "/:id/comments",
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.getComments
);

// ----- Comments section end -----