import mongoose from "mongoose";
import { PostDBModel } from "../models/database/PostDBModel";

const postSchema = new mongoose.Schema<PostDBModel>({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
  blogName: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export const Posts = mongoose.model("posts", postSchema);