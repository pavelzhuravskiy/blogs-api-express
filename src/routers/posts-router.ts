import { Router } from "express";
import { authBasic } from "../middlewares/auth/auth-basic";
import { validationPostsInput } from "../middlewares/validations/input/validation-posts-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationPostsCreation } from "../middlewares/validations/validation-posts-creation";
import { validationPostsFindByParamId } from "../middlewares/validations/find-by-id/validation-posts-find-by-param-id";
import { validationCommentsInput } from "../middlewares/validations/input/validation-comments-input";
import { authBearer } from "../middlewares/auth/auth-bearer";
import { tokenParser } from "../middlewares/auth/token-parser";
import { container } from "../composition-root";
import { PostsController } from "../controllers/PostsController";

export const postsRouter = Router({});

const postsController = container.resolve(PostsController)

postsRouter.post(
  "/",
  authBasic,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  postsController.createPost.bind(postsController)
);

postsRouter.get("/", postsController.getPosts.bind(postsController));

postsRouter.get(
  "/:id",
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.getPost.bind(postsController)
);

postsRouter.put(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationPostsInput,
  validationPostsCreation,
  validationErrorCheck,
  postsController.updatePost.bind(postsController)
);

postsRouter.delete(
  "/:id",
  authBasic,
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.deletePost.bind(postsController)
);

postsRouter.delete(
  "/",
  authBasic,
  postsController.deletePosts.bind(postsController)
);

// +++++ Comments section start +++++

postsRouter.post(
  "/:id/comments",
  authBearer,
  validationPostsFindByParamId,
  validationCommentsInput,
  validationErrorCheck,
  postsController.createComment.bind(postsController)
);

postsRouter.get(
  "/:id/comments",
  tokenParser,
  validationPostsFindByParamId,
  validationErrorCheck,
  postsController.getComments.bind(postsController)
);

// ----- Comments section end -----