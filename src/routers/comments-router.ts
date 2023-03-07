import { Request, Response, Router } from "express";
import { validationErrorCheck } from "../middlewares/validations/_validation-error-check";
import { ObjectId } from "mongodb";
import { validationCommentsFindByParamId } from "../middlewares/validations/validation-comments-find-by-param-id";
import { commentsQueryRepository } from "../repositories/mongodb-comments-query-repository";

export const commentsRouter = Router({});

commentsRouter.get(
  "/:id",
  validationCommentsFindByParamId,
  validationErrorCheck,
  async (req: Request, res: Response) => {
    const foundComment = await commentsQueryRepository.findCommentById(
      new ObjectId(req.params.id)
    );
    res.json(foundComment);
  }
);

//
// export const postsRouter = Router({});
//
// postsRouter.get(
//   "/",
//   async (req: RequestWithQuery<GlobalQueryModel>, res: Response) => {
//     const foundPosts = await postsQueryRepository.findPosts(
//       null,
//       null,
//       req.query.sortBy,
//       req.query.sortDirection,
//       req.query.pageNumber,
//       req.query.pageSize
//     );
//     res.json(foundPosts);
//   }
// );
//

//
// postsRouter.post(
//   "/",
//   authBasic,
//   validationPostsInput,
//   validationPostsCreation,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const newPost = await postsService.createNewPost(req.body);
//     res.status(201).json(newPost);
//   }
// );
//
// postsRouter.put(
//   "/:id",
//   authBasic,
//   validationPostsFindByParamId,
//   validationPostsInput,
//   validationPostsCreation,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const isUpdated = await postsService.updatePost(
//       new ObjectId(req.params.id),
//       req.body
//     );
//
//     if (isUpdated) {
//       const updatedPost = await postsQueryRepository.findPostById(req.body.id);
//       res.status(204).json(updatedPost);
//     }
//   }
// );
//
// postsRouter.delete(
//   "/:id",
//   authBasic,
//   validationPostsFindByParamId,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const isDeleted = await postsService.deletePost(
//       new ObjectId(req.params.id)
//     );
//     if (isDeleted) {
//       res.sendStatus(204);
//     }
//   }
// );
//
// // Comments section start
//
// postsRouter.get(
//   "/:id/comments",
//   validationPostsFindByParamId,
//   validationErrorCheck,
//   async (
//     req: Request &
//       RequestWithParamsAndQuery<GlobalIdStringModel, GlobalQueryModel>,
//     res: Response
//   ) => {
//     const foundComments = await postsQueryRepository.findComments(
//       new ObjectId(req.params.id),
//       null,
//       req.query.sortBy,
//       req.query.sortDirection,
//       req.query.pageNumber,
//       req.query.pageSize
//     );
//     res.json(foundComments);
//   }
// );
//
// postsRouter.post(
//   "/:id/comments",
//   // authBasic,
//   validationPostsFindByParamId,
//   ValidationCommentsInput,
//   validationErrorCheck,
//   async (req: Request, res: Response) => {
//     const newComment = await postsService.createNewCommentByPostId(
//       new ObjectId(req.params.id),
//       req.body
//     );
//     res.status(201).json(newComment);
//   }
// );
//
// // Comments section end
//
// postsRouter.delete("/", authBasic, async (req: Request, res: Response) => {
//   const isDeleted = await postsService.deleteAll();
//   if (isDeleted) {
//     res.sendStatus(204);
//   } else {
//     res.sendStatus(404);
//   }
// });