import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { commentsQueryRepository } from "../../composition-root";

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