import mongoose from "mongoose";
import { CommentDBModel } from "../models/database/CommentDBModel";

const commentSchema = new mongoose.Schema<CommentDBModel>({
  content: { type: String, required: true },
  commentatorInfo: {
    userId: { type: String, required: true },
    userLogin: { type: String, required: true },
  },
  postId: { type: String, required: true },
  createdAt: { type: String, required: true },
  likesInfo: {
    likesCount: {type: Number, required: true},
    dislikesCount: {type: Number, required: true},
    myStatus: {type: String, required: true}
  }
});

export const Comments = mongoose.model("comments", commentSchema);