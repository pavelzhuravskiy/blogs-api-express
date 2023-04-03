import { ObjectId } from "mongodb";

export class CommentDBModel {
  constructor(
    public _id: ObjectId,
    public content: string,
    public commentatorInfo: {
      userId: string;
      userLogin: string;
    },
    public postId: string,
    public createdAt: string,
    public likesInfo: {
        likesCount: number,
        dislikesCount: number,
        myStatus: string
    }
  ) {}
}