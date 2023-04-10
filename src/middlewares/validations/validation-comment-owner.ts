import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { container } from "../../composition-root";
import { CommentsQueryRepository } from "../../repositories/query-repos/comments-query-repository";

const commentsQueryRepository = container.resolve(CommentsQueryRepository);

export const validationCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const foundComment = await commentsQueryRepository.findCommentById(
    new ObjectId(req.params.id)
  );
  if (
    foundComment &&
    foundComment.commentatorInfo.userId === req.user!._id.toString()
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
};