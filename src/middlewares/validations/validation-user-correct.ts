import { NextFunction, Request, Response } from "express";
import { commentsQueryRepository } from "../../repositories/query-repos/mongodb-comments-query-repository";
import { ObjectId } from "mongodb";

export const validationUserCorrect = async (
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