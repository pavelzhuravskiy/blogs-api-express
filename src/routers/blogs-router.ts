import { Router } from "express";
import { authBasic } from "../middlewares/auth/auth-basic";
import { validationBlogsInput } from "../middlewares/validations/input/validation-blogs-input";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { validationBlogsFindByParamId } from "../middlewares/validations/find-by-id/validation-blogs-find-by-param-id";
import { validationPostsInput } from "../middlewares/validations/input/validation-posts-input";
import { blogsController } from "../controllers/BlogsController";

export const blogsRouter = Router({});

blogsRouter.post(
  "/",
  authBasic,
  validationBlogsInput,
  validationErrorCheck,
  blogsController.createBlog
);

blogsRouter.get("/", blogsController.getBlogs);

blogsRouter.get(
  "/:id",
  validationBlogsFindByParamId,
  validationErrorCheck,
  blogsController.getBlog
);

blogsRouter.put(
  "/:id",
  authBasic,
  validationBlogsFindByParamId,
  validationBlogsInput,
  validationErrorCheck,
  blogsController.updateBlog
);

blogsRouter.delete(
  "/:id",
  authBasic,
  validationBlogsFindByParamId,
  validationErrorCheck,
  blogsController.deleteBlog
);

blogsRouter.delete("/", authBasic, blogsController.deleteBlogs);

// +++++ Posts in blogs section start +++++

blogsRouter.post(
  "/:id/posts",
  authBasic,
  validationBlogsFindByParamId,
  validationPostsInput,
  validationErrorCheck,
  blogsController.createPost
);

blogsRouter.get(
  "/:id/posts",
  validationBlogsFindByParamId,
  validationErrorCheck,
  blogsController.getPosts
);

// ----- Posts in blogs section end -----