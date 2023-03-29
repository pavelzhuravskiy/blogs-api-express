import mongoose from "mongoose";
import { BlogDBModel } from "../models/BlogDBModel";

const blogSchema = new mongoose.Schema<BlogDBModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  createdAt: String,
  isMembership: Boolean,
});

export const Blogs = mongoose.model("blogs", blogSchema);