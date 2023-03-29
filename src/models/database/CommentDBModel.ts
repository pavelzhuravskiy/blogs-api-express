import { WithId } from "mongodb";

export type CommentDBModel = WithId<{
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  postId: string;
  createdAt: string;
}>;